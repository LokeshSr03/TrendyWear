// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-lg font-semibold">TrendyWear</h1>
          <p>Developed by Lokesh Suthar</p>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-400 hover:text-white transition">
            Home
          </Link>
          <Link
            to="/cart"
            className="text-gray-400 hover:text-white transition"
          >
            Cart
          </Link>
          <Link
            to="/login"
            className="text-gray-400 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
