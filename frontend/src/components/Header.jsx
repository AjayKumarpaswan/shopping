import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Search, User, Heart, ShoppingBag, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


import { useDispatch } from "react-redux";
import { clearCartOnLogout } from "../redux/cartSlice";

import { useSelector } from "react-redux";


const Header = () => {

  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

// cart items 
const cartItems = useSelector((state) => state.cart.items);


  const navigate = useNavigate();
  const profileRef = useRef();

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



// add to cart 
// useEffect(() => {
//   // Load cart from localStorage initially
//   const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//   setCart(storedCart);

//   // Listen to cart updates
//   const updateCart = () => {
//     const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(updatedCart);
//   };

//   window.addEventListener("cartUpdated", updateCart);

//   return () => window.removeEventListener("cartUpdated", updateCart);
// }, []);

const handleLogout = () => {
  dispatch(clearCartOnLogout()); // clear only this user's cart

  localStorage.removeItem("user");
  localStorage.removeItem("token");

  setUser(null);
  setProfileOpen(false);

  navigate("/login");
};

  // Navigation links with paths
  const navLinks = [
    { name: "KURTA", path: "/kurta" },
    { name: "LEHENGA", path: "/lehenga" },
    { name: "CO-ORDS", path: "/co-ords" },
  ];

  return (
    <header className="w-full shadow-sm fixed top-0 left-0 z-50 bg-white">
      <div className="flex items-center justify-between px-4 md:px-10 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <Link to="/">
            <img
              src="/assets/kamakhyalogo.png"
              alt="Logo"
              className="w-16 sm:w-20 md:w-20 lg:w-20 xl:w-30 transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex justify-between gap-20">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="relative text-sm font-semibold text-gray-800 hover:text-pink-600"
              >
                {link.name}
                {link.badge && (
                  <span className="absolute -top-2 -right-4 text-[10px] text-pink-500 font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center Section - Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2 flex-1 max-w-md">
          <Search className="text-gray-500 w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full bg-transparent outline-none text-sm text-gray-700"
          />
        </div>

        {/* Right Section - Icons */}
        <div className="flex items-center gap-6">
          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <div
              className="flex flex-col items-center text-xs cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              {user && user.avatar ? (
                <img
                   src={
                      user.avatar.startsWith("http")
                        ? user.avatar // full URL from Google
                        : `http://localhost:5000${user.avatar}` // local upload
                    }
                  alt="avatar"
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5" />
              )}
              <span>{user ? "My Profile" : "Profile"}</span>
            </div>

            {/* Dropdown */}
            {profileOpen && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg p-4 flex flex-col items-center z-50">
                <img
                  src={
                      user.avatar.startsWith("http")
                        ? user.avatar // full URL from Google
                        : `http://localhost:5000${user.avatar}` // local upload
                    }
                  alt="avatar"
                  className="w-12 h-12 rounded-full mb-2"
                />
                <p className="text-sm font-semibold mb-1">Welcome, {user.name}</p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700 transition-all text-sm"
                >
                  Logout
                </button>
              </div>
            )}

            {/* If not logged in, clicking navigates to login */}
            {profileOpen && !user && (
              
                navigate("/login")
              
            )}
          </div>

          <div
  className="flex flex-col items-center text-xs cursor-pointer"
  onClick={() => navigate("/wishlist")}
>
  <Heart className="w-5 h-5" />
  <span>Wishlist</span>
</div>

        <div
  className="relative flex flex-col items-center text-xs cursor-pointer"
  onClick={() => navigate("/cart")}
>
  <ShoppingBag className="w-5 h-5" />
  <span>Bag</span>
  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-1 text-[10px] bg-pink-600 text-white w-4 h-4 flex items-center justify-center rounded-full">
      {cartItems.length}
    </span>
  )}
</div>


          {/* Hamburger (Mobile Only) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            {menuOpen ? <X size={24} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md flex flex-col items-start p-4 space-y-4">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-gray-700 font-semibold hover:text-pink-600 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
              {link.badge && (
                <span className="ml-1 text-[10px] text-pink-500 font-bold">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}

          {/* Search Bar (Mobile) */}
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full">
            <Search className="text-gray-500 w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full bg-transparent outline-none text-sm text-gray-700"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
