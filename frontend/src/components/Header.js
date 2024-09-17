import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, ChevronDownIcon } from "@heroicons/react/outline"; // Menu and Close icons from HeroIcons
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FiShoppingCart } from "react-icons/fi"; // Import the cart icon
import { useSelector } from "react-redux";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State for menu toggle

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu state
  };

  return (
    <header className="bg-gray-800 p-4 ">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="text-white text-2xl font-bold">
          TrendyWear
        </Link>

        {/* Menu for Mobile */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Dropdown Menu for Mobile */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-700 md:hidden">
            <ul className="flex flex-col p-4 space-y-4">
              <li>
                <Link to="/" className="text-white block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white block">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white block">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Static Links for Larger Screens */}
        <div className="hidden md:flex space-x-10 flex justify-center items-center">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/about" className="text-white">
            About
          </Link>
          <Link to="/services" className="text-white">
            Services
          </Link>

          {/* Cart Icon Link */}
          <Link to="/cart" className="text-white">
            <FiShoppingCart className="h-6 w-6" />
          </Link>

          {/* Dropdown Menu */}
          {userInfo ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {userInfo && userInfo.username}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 h-5 w-5 text-gray-400"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-3 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
              >
                <div className="py-1">
                  <MenuItem>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Profile
                    </Link>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          ) : (
            <Link to="/login" className="text-white">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
