import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-900 text-white p-5 font-body">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center space-y-5">
        {/* Social Links */}
        <div className="flex space-x-5">
          <a
            href="https://www.instagram.com/designbullz.exhibitions/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-300 transition-colors"
          >
            <FaInstagram className="text-2xl" />
          </a>
          <a
            href="https://www.facebook.com/designbullz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-300 transition-colors"
          >
            <FaFacebookF className="text-2xl" />
          </a>
          <a
            href="https://in.linkedin.com/company/designbullz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-300 transition-colors"
          >
            <FaLinkedinIn className="text-2xl" />
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-center font-heading">
          &copy; 2024 3D Model Storage Web App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
