import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import colors from "colors";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

// Middleware for CORS and parsing JSON
app.use(cors());
app.use(express.json());

// Define __dirname in ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// MySQL pool setup
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Unlimited request queue
});

// Promisify pool queries for async/await support
const db = pool.promise();

(async () => {
  try {
    await db.query("SELECT 1"); // Test connection
    console.log("MySQL pool connected 🎉".bgMagenta.white);
  } catch (err) {
    console.error("Error connecting to MySQL pool:", err);
  }
})();

// Setup multer for file upload (multiple files)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as the filename
  },
});

const upload = multer({ storage });

// Function to generate a unique file number like JH7878J (6 characters minimum)
function generateUniqueFileNumber() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  let uniqueFileNumber = "";

  for (let i = 0; i < 2; i++) {
    uniqueFileNumber += letters.charAt(
      Math.floor(Math.random() * letters.length)
    );
  }

  for (let i = 0; i < 4; i++) {
    uniqueFileNumber += digits.charAt(
      Math.floor(Math.random() * digits.length)
    );
  }

  uniqueFileNumber += letters.charAt(
    Math.floor(Math.random() * letters.length)
  );

  return uniqueFileNumber;
}

// Signup route
app.post("/signup", async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  try {
    // Validate input
    if (!email || !username || !password || !confirmPassword) {
      return res.status(400).json({ error: "Please fill out all fields" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists (email or username)
    const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
    const [existingUsers] = await db.query(checkQuery, [email, username]);

    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ error: "Email or username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const insertQuery =
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
    const [result] = await db.query(insertQuery, [
      email,
      username,
      hashedPassword,
    ]);

    // Respond with a success message
    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId, // Optionally return the new user's ID
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "An error occurred during signup" });
  }
});

// POST route to handle user login
app.post("/login", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Validate input
    if (!email && !username) {
      return res.status(400).json({ error: "Email or Username is required." });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required." });
    }

    // Check if user exists by email or username
    const query = "SELECT * FROM users WHERE email = ? OR username = ?";
    const [results] = await db.query(query, [email || null, username || null]);

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const user = results[0]; // Assuming email and username are unique

    // Compare provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username }, // Payload
      process.env.JWT_SECRET, // Secret key for signing the token (set this in .env)
      { expiresIn: "1h" } // Token expiration time
    );

    // Respond with the token
    res.status(200).json({
      message: "Login successful",
      token, // Token sent to the client
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login." });
  }
});

// POST route to upload files
app.post(
  "/upload",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  async (req, res) => {
    try {
      const { design, front_depth, industry } = req.body;

      // Generate a unique file number
      const uniqueFileNumber = generateUniqueFileNumber();

      // Generate file URLs
      const fileUrl1 = req.files.file1
        ? `https://api.dbzmanager.com/uploads/${req.files.file1[0].filename}`
        : null;
      const fileUrl2 = req.files.file2
        ? `https://api.dbzmanager.com/uploads/${req.files.file2[0].filename}`
        : null;

      // Insert data into MySQL
      const query =
        "INSERT INTO uploads (design, front_depth, industry, file_number, file_url_1, file_url_2) VALUES (?, ?, ?, ?, ?, ?)";
      const [result] = await db.query(query, [
        design,
        front_depth,
        industry,
        uniqueFileNumber,
        fileUrl1,
        fileUrl2,
      ]);

      console.log("Data inserted into MySQL:", result);

      // Respond with success
      res.status(200).json({
        message: "Data submitted successfully",
        fileUrls: { file1: fileUrl1, file2: fileUrl2 },
        uniqueFileNumber,
      });
    } catch (err) {
      console.error("Error inserting data into MySQL:", err);
      res.status(500).json({ error: "Error inserting data into MySQL" });
    }
  }
);

// GET route to fetch uploaded files' details with filtering
app.get("/uploads", async (req, res) => {
  try {
    const { design, front_depth, industry } = req.query; // Get query parameters

    // Start building the SQL query
    let query = "SELECT * FROM uploads WHERE 1=1"; // Always true for dynamic conditions
    const queryParams = [];

    // Add conditions dynamically
    if (design) {
      query += " AND design = ?";
      queryParams.push(design);
    }
    if (front_depth) {
      query += " AND front_depth = ?";
      queryParams.push(front_depth);
    }
    if (industry) {
      query += " AND industry = ?";
      queryParams.push(industry);
    }

    // Execute the query
    const [results] = await db.query(query, queryParams);

    // Respond with the results
    res.status(200).json({ uploads: results });
  } catch (err) {
    console.error("Error fetching data from MySQL:", err);
    res.status(500).json({ error: "Error fetching data from MySQL" });
  }
});

// GET route to get the number of uploaded files grouped by design and front_depth
app.get("/uploads/summary", async (req, res) => {
  try {
    const query = `
      SELECT 
        design, 
        front_depth, 
        COUNT(*) AS upload_count
      FROM uploads
      GROUP BY design, front_depth
      ORDER BY upload_count DESC; -- Order by the number of uploads in descending order
    `;

    const [results] = await db.query(query);

    res.status(200).json({ summary: results });
  } catch (err) {
    console.error("Error fetching summary from MySQL:", err);
    res.status(500).json({ error: "Error fetching summary from MySQL" });
  }
});

// GET route to get the design count list and the total count of all uploads
app.get("/uploads/count", async (req, res) => {
  try {
    // Query to get the count of uploads for each design
    const designCountsQuery = `
      SELECT 
        design, 
        COUNT(*) AS upload_count
      FROM uploads
      GROUP BY design
      ORDER BY upload_count DESC;
    `;
    const [designCounts] = await db.query(designCountsQuery);

    // Query to get the total count of all uploads
    const totalCountQuery = `
      SELECT COUNT(*) AS total_uploads FROM uploads;
    `;
    const [totalCountResults] = await db.query(totalCountQuery);

    const totalUploads = totalCountResults[0]?.total_uploads || 0;

    // Return both the design count list and the total upload count
    res.status(200).json({
      design_counts: designCounts,
      total_uploads: totalUploads,
    });
  } catch (err) {
    console.error("Error fetching upload counts from MySQL:", err);
    res.status(500).json({ error: "Error fetching upload counts from MySQL" });
  }
});

// GET route to fetch all unique industries
app.get("/industries", async (req, res) => {
  try {
    const query = "SELECT DISTINCT industry FROM uploads";

    const [results] = await db.query(query);

    // Extract only the industry names from results
    const industries = results.map((row) => row.industry);

    res.status(200).json({ industries });
  } catch (err) {
    console.error("Error fetching industries from MySQL:", err);
    res.status(500).json({ error: "Error fetching industries from MySQL" });
  }
});

// PUT route to edit an existing upload entry
app.put(
  "/uploads/:fileNumber",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  async (req, res) => {
    const { fileNumber } = req.params; // Unique file number from URL parameter
    const { design, front_depth, industry } = req.body; // Fields to update

    try {
      // Validate and generate new file URLs if files are uploaded
      const fileUrl1 = req.files?.file1
        ? `https://api.dbzmanager.com/uploads/${req.files.file1[0].filename}`
        : null;
      const fileUrl2 = req.files?.file2
        ? `https://api.dbzmanager.com/uploads/${req.files.file2[0].filename}`
        : null;

      // Check if the record exists
      const checkQuery = "SELECT * FROM uploads WHERE file_number = ?";
      const [existingRecords] = await db.query(checkQuery, [fileNumber]);

      if (existingRecords.length === 0) {
        return res.status(404).json({ error: "Record not found" });
      }

      const currentRecord = existingRecords[0];

      // Determine final values: Use new values if provided, otherwise keep current ones
      const finalDesign = design || currentRecord.design;
      const finalFrontDepth = front_depth || currentRecord.front_depth;
      const finalIndustry = industry || currentRecord.industry;
      const finalFileUrl1 = fileUrl1 || currentRecord.file_url_1;
      const finalFileUrl2 = fileUrl2 || currentRecord.file_url_2;

      // Update the record
      const updateQuery = `
        UPDATE uploads
        SET 
          design = ?, 
          front_depth = ?, 
          industry = ?, 
          file_url_1 = ?, 
          file_url_2 = ?
        WHERE file_number = ?
      `;

      const updateParams = [
        finalDesign,
        finalFrontDepth,
        finalIndustry,
        finalFileUrl1,
        finalFileUrl2,
        fileNumber,
      ];

      const [updateResult] = await db.query(updateQuery, updateParams);

      res.status(200).json({
        message: "Data updated successfully",
        updatedFields: {
          design: finalDesign,
          front_depth: finalFrontDepth,
          industry: finalIndustry,
          fileUrls: { file1: finalFileUrl1, file2: finalFileUrl2 },
        },
      });
    } catch (err) {
      console.error("Error updating data in MySQL:", err);
      res.status(500).json({ error: "Error updating data in MySQL" });
    }
  }
);

// DELETE route to delete an upload by its unique ID
app.delete("/uploads/:id", async (req, res) => {
  const { id } = req.params; // Get the unique ID from URL parameter

  try {
    // Check if the record exists by its ID
    const checkQuery = "SELECT * FROM uploads WHERE id = ?";
    const [results] = await db.query(checkQuery, [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    const record = results[0];

    // Initialize an array to hold file paths for deletion
    const deleteFiles = [];

    // Ensure that we only get the filename (not the full URL)
    const getFilePath = (fileUrl) => {
      if (!fileUrl) return null;
      // Extract the file name from the URL and join it with the __dirname path
      const fileName = path.basename(fileUrl); // Get the file name from URL
      return path.join(__dirname, "uploads", fileName);
    };

    // Get the file paths to delete
    const file1Path = getFilePath(record.file_url_1);
    const file2Path = getFilePath(record.file_url_2);

    // Check if the file exists before attempting to delete
    if (file1Path && fs.existsSync(file1Path)) {
      deleteFiles.push(file1Path);
    }
    if (file2Path && fs.existsSync(file2Path)) {
      deleteFiles.push(file2Path);
    }

    // Remove files from the server
    deleteFiles.forEach((filePath) => {
      if (filePath) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}:`, err);
          } else {
            console.log(`File deleted: ${filePath}`);
          }
        });
      }
    });

    // Delete the record from the database
    const deleteQuery = "DELETE FROM uploads WHERE id = ?";
    await db.query(deleteQuery, [id]);

    res.status(200).json({
      message: "Record and associated files deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting data from MySQL:", err);
    res.status(500).json({ error: "Error deleting record from MySQL" });
  }
});

app.post(
  "/submit-inquiry",
  upload.fields([
    { name: "floorPlan", maxCount: 1 },
    { name: "logoFiles", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      companyName,
      contactPerson,
      contactEmail,
      contactNumber,
      website,
      eventName,
      venueCity,
      eventDate,
      stallSize,
      sidesOpenStall,
      brandColor,
      meetingRoomRequired,
      storeRoomRequired,
      tvLedWallRequired,
      productDisplay,
      seatingRequirements,
      numberOfProducts,
      sizeOfProducts,
      weightOfProducts,
      deadline,
      specificInformation,
      suggestedBudget,
    } = req.body;

    // File handling with optional fields
    const floorPlanUrl = req.files["floorPlan"]
      ? `https://api.dbzmanager.com/uploads/${req.files["floorPlan"][0].filename}`
      : "";
    const logoFilesUrl = req.files["logoFiles"]
      ? `https://api.dbzmanager.com/uploads/${req.files["logoFiles"][0].filename}`
      : "";

    const submissionTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // Correct format for MySQL

    // Insert form data into MySQL database
    const query = `INSERT INTO inquiry_form (
      company_name,
      contact_person,
      contact_email,
      contact_number,
      website,
      event_name,
      venue_city,
      event_date,
      stall_size,
      sides_open_stall,
      floor_plan_url,
      logo_files_url,
      brand_color,
      meeting_room_required,
      store_room_required,
      tv_led_wall_required,
      product_display,
      seating_requirements,
      number_of_products,
      size_of_products,
      weight_of_products,
      deadline,
      specific_information,
      suggested_budget,
      submission_time
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      companyName,
      contactPerson,
      contactEmail,
      contactNumber,
      website,
      eventName,
      venueCity,
      eventDate,
      stallSize,
      sidesOpenStall,
      floorPlanUrl,
      logoFilesUrl,
      brandColor,
      meetingRoomRequired,
      storeRoomRequired,
      tvLedWallRequired,
      productDisplay,
      JSON.stringify(seatingRequirements), // Storing seating requirements as a JSON string
      numberOfProducts,
      sizeOfProducts,
      weightOfProducts,
      deadline,
      specificInformation,
      suggestedBudget,
      submissionTime, // Correct format for MySQL
    ];

    try {
      // Insert data into the database
      const [result] = await db.query(query, values);
      res.status(200).json({
        message: "Form submitted successfully",
        data: result,
      });
    } catch (err) {
      console.error("Error inserting data into the database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// GET route to fetch inquiries

app.get("/get-inquiries", async (req, res) => {
  try {
    // Query to fetch all inquiries from the database
    const [inquiries] = await db.query("SELECT * FROM inquiry_form");

    // Check if a specific file is requested for download
    if (req.query.download) {
      const fileToDownload = path.resolve("./uploads", req.query.download);

      // Check if the file exists
      if (fs.existsSync(fileToDownload)) {
        const fileName = path.basename(fileToDownload);

        // Force the file to be downloaded
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${fileName}"`
        );
        res.setHeader("Content-Type", "application/octet-stream");

        // Stream the file for download
        return fs
          .createReadStream(fileToDownload)
          .on("error", (error) => {
            console.error("Error streaming file:", error);
            res.status(500).send("Error while downloading the file.");
          })
          .pipe(res);
      } else {
        return res.status(404).json({ error: "File not found" });
      }
    }

    // If no file is requested for download, return inquiry data
    res.status(200).json({
      message: "Inquiries fetched successfully",
      data: inquiries.map((inquiry) => ({
        ...inquiry,
        floorPlanDownloadLink: `https://api.dbzmanager.com/get-inquiries?download=${path.basename(
          inquiry.floor_plan_url
        )}`,
        logoFileDownloadLink: `https://api.dbzmanager.com/get-inquiries?download=${path.basename(
          inquiry.logo_files_url
        )}`,
      })),
    });
  } catch (err) {
    console.error("Error fetching data from the database:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/add-directory", upload.single("document"), async (req, res) => {
  const { exhibitionName, year, venue } = req.body;

  // Generate document URL if a file is uploaded
  const documentUrl = req.file
    ? `https://api.dbzmanager.com/uploads/${req.file.filename}`
    : null;

  try {
    // Insert data into MySQL using async/await for better error handling
    const query = `INSERT INTO exhibition_directory (exhibition_name, year, venue, document_url) 
                   VALUES (?, ?, ?, ?)`;

    const values = [exhibitionName, year, venue, documentUrl];

    // Using async/await to execute the query
    const [results] = await db.query(query, values);

    res.status(200).json({
      message: "Exhibition directory added successfully!",
      data: results,
    });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-directories", async (req, res) => {
  try {
    // Query to fetch all directories from the database
    const query = "SELECT * FROM exhibition_directory";

    // Using async/await for the database query
    const [results] = await db.query(query);

    // Check if a specific file is requested for download
    if (req.query.download) {
      const fileToDownload = path.resolve("./uploads", req.query.download);

      // Check if the file exists
      if (fs.existsSync(fileToDownload)) {
        const fileName = path.basename(fileToDownload);

        // Force the file to be downloaded
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${fileName}"`
        );
        res.setHeader("Content-Type", "application/octet-stream");

        // Stream the file for download
        return fs
          .createReadStream(fileToDownload)
          .on("error", (error) => {
            console.error("Error streaming file:", error);
            res.status(500).send("Error while downloading the file.");
          })
          .pipe(res);
      } else {
        return res.status(404).json({ error: "File not found" });
      }
    }

    // If no file is requested for download, return directory data
    res.status(200).json({
      message: "Directories fetched successfully",
      data: results.map((directory) => ({
        ...directory,
        documentDownloadLink: directory.document_url
          ? `https://api.dbzmanager.com/get-directories?download=${path.basename(
              directory.document_url
            )}`
          : null,
      })),
    });
  } catch (err) {
    console.error("Error fetching data from the database:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST API endpoint to add a new event
app.post("/add-event", async (req, res) => {
  const {
    exhibitionName,
    startDate,
    endDate,
    venue,
    city,
    directoryAvailable,
    existingClients,
  } = req.body;

  // Construct query and values
  const query = `INSERT INTO events (exhibition_name, start_date, end_date, venue, city, directory_available, existing_clients)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  try {
    // Using async/await for the database query
    const [result] = await db.query(query, [
      exhibitionName,
      startDate,
      endDate,
      venue,
      city,
      directoryAvailable,
      existingClients ? existingClients.join(", ") : "",
    ]);

    res.status(200).json({ message: "Event details submitted successfully!" });
  } catch (err) {
    console.error("Error inserting event data:", err);
    res.status(500).json({ message: "Error submitting event data" });
  }
});

// GET API endpoint to fetch all events
app.get("/events", async (req, res) => {
  const query = "SELECT * FROM events ORDER BY start_date DESC"; // Fetch all events, ordered by start date

  try {
    // Using async/await for the database query
    const [results] = await db.query(query);

    res.status(200).json({ events: results });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Error fetching events" });
  }
});

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(port, () =>
  console.log(`Server running on port ${port}🚀`.bgCyan.white)
);
