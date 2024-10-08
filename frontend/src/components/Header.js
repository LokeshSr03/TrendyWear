import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, XIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to the search results page or filter the products
    navigate(`/search?query=${searchQuery}`);
    setSearchQuery(""); // Clear search input after submission
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 p-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="text-teal-600 text-2xl font-bold">
          TrendyWear
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex md:flex-grow mx-32"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-l-md p-2 flex-grow"
          />
          <button
            type="submit"
            className="bg-teal-600 text-white rounded-r-md px-4"
          >
            Search
          </button>
        </form>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-teal-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-teal-50 md:hidden">
            <ul className="flex flex-col p-4 space-y-4">
              <li>
                <Link to="/" className="text-teal-600 block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-teal-600 block">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-teal-600 block">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-teal-600 block">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-teal-600 block">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {/* Cart Icon */}
          <Link to="/cart" className="text-gray-700 hover:text-teal-600">
            <FiShoppingCart className="h-6 w-6" />
          </Link>

          {/* User Dropdown Menu */}
          {userInfo ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex justify-center rounded-md bg-teal-600 text-white px-4 py-2 text-sm font-semibold shadow hover:bg-teal-500">
                    {userInfo.username}
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                    >
                      Orders
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/login"
                      onClick={() => dispatch(logout())}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                    >
                      Logout
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>

              {userInfo.isAdmin && (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="inline-flex justify-center rounded-md bg-teal-600 text-white px-4 py-2 text-sm font-semibold shadow hover:bg-teal-500">
                      Manage
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                      <Link
                        to="/product"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                      >
                        Create Product
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              )}
            </>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-teal-600">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
