import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ toggleTheme }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isActive, setIsActive] = useState(false);

  const handleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <nav className="bg-indigo-500 text-gray-50 dark:bg-slate-900 p-3 px-4 flex justify-between items-center shadow-xl dark:text-gray-50">
        {/* Logo */}
        <Link
          to="/"
          className="flex gap-2 items-center transform hover:scale-110 transition-transform"
          onClick={toggleTheme}
        >
          <img
            className="object-cover max-h-12 max-w-12"
            src="./src/assets/paint-palette.png"
            alt=""
          />
          <span className="text-lg font-bold text-slate-900 dark:text-yellow-200 tracking-wider">
            Sketch
            <span className="text-yellow-600">Symphony</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex gap-12">
          <NavLink to="/" className="font-medium text-gray-100 hover:text-orange-700 transform hover:scale-110 transition-transform">Home</NavLink>
          {/* <NavLink to="/Gallery" className="font-medium text-gray-100 hover:text-orange-700 transform hover:scale-110 transition-transform">Gallery</NavLink> */}
          <NavLink to="/Profile" className="font-medium text-gray-100 hover:text-orange-700 transform hover:scale-110 transition-transform">{currentUser?"Listings":"Sign In"}</NavLink>
          <NavLink to="/ContactUs" className="font-medium text-gray-100 hover:text-orange-700 transform hover:scale-110 transition-transform">Contact Us</NavLink>
          <NavLink to="/About" className="font-medium text-gray-100 hover:text-orange-700 transform hover:scale-110 transition-transform">About</NavLink>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="p-2 md:hidden" onClick={handleMenu}>
          <i className="fa-solid fa-bars text-gray-600"></i>
        </button>

        {/* Profile Link or Sign Up Button */}
        <Link to={currentUser ? "/Profile" : "/Register"} className="hidden md:flex gap-2 items-center border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600">
          {currentUser ? <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="DP" /> : <>
            <i className="fa-solid fa-palette"></i>
            <span>Sketchers</span>
            <i className="fa-solid fa-arrow-right"></i>
          </>}
        </Link>

        {/* Mobile Menu */}
        <div className={`fixed z-10 md:hidden bg-white inset-0 p-3 ${isActive ? "" : "hidden"}`}>
          <div className="flex justify-between">
            <Link to="/" className="flex gap-2 items-center">
              <img
                className="object-cover max-h-12 max-w-12"
                src="./src/assets/paint-palette.png"
                alt=""
              />
              <span className="text-lg font-medium font-display">ArtforSale</span>
            </Link>
            <button className="p-2 md:hidden" onClick={handleMenu}>
              <i className="fa-solid fa-xmark text-gray-600"></i>
            </button>
          </div>
          <div className="mt-6">
            <NavLink to="/" className="font-medium m-3 p-3 hover:bg-indigo-300 block rounded-lg">Home</NavLink>
            {/* <NavLink to="/Gallery" className="font-medium m-3 p-3 hover:bg-indigo-300 block rounded-lg">Gallery</NavLink> */}
            <NavLink to="/Profile" className="font-medium text-gray-100 hover:text-orange-700 transform hover:scale-110 transition-transform">{currentUser?"Listings":"Sign In"}</NavLink>
            <NavLink to="/ContactUs" className="font-medium m-3 p-3 hover:bg-indigo-300 block rounded-lg">Contact Us</NavLink>
            <NavLink to="/About" className="font-medium m-3 p-3 hover:bg-indigo-300 block rounded-lg">About</NavLink>
          </div>
          <div className="h-[1px] bg-gray-500"></div>
          <Link to="/Register" className="text-black bg-indigo-300 mt-6 w-full flex gap-2 items-center px-6 py-4 rounded-lg hover:bg-gray-500">
            <i className="fa-solid fa-palette"></i>
            <span>Sketchers</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
