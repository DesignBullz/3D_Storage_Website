// import React from "react";

// function Footer() {
//   return (
//     <footer className="bg-red-600  text-white p-5 font-heading">
//       <div className="max-w-screen-xl mx-auto flex flex-col items-center space-y-5">
//         {/* Footer Text */}
//         <p className="text-sm text-center font-heading">
//           &copy; 2024 3D Model Storage Web App. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import React from "react";

function Footer() {
  return (
    <footer
      className="text-white p-5 font-heading"
      style={{
        background: "linear-gradient(45deg, #f44336, #000000)", // Gradient from red-500 to black
      }}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col items-center space-y-5">
        {/* Footer Text */}
        <p className="text-sm text-center font-heading">
          &copy; 2024 3D Model Storage Web App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
