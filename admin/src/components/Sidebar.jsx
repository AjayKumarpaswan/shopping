// AdminSidebar.jsx
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const sections = [
  { name: "All Orders", path: "/all-orders" },
  { name: "All Products", path: "/all-products" },
  { name: "All Categories", path: "/all-categories" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger for mobile */}
      <div className="md:hidden md:ml-65 flex items-center justify-between p-4 ">
        <h1 className="font-bold font-cormorant text-lg">Admin Panel</h1>
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 transform md:translate-x-0 transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
       {/* Logo */}
<div className="p-6 text-center border-b">
  <Link to="/all-orders">
    <img
      src="/assets/kamakhyalogo.png"
      alt="Admin Logo"
      className="mx-auto w-32 h-auto object-contain cursor-pointer  transition"
    />
  </Link>
</div>


        {/* Sections */}
        <nav className="mt-6">
          {sections.map((section) => (
            <Link
              key={section.name}
              to={section.path}
              className={`block px-6 py-3 hover:bg-pink-700 text-center ${
                location.pathname === section.path ? "bg-pink-700" : ""
              }`}
              onClick={() => setIsOpen(false)} // close on mobile click
            >
              {section.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
     {isOpen && (
  <div
    className="fixed inset-0 bg-white/98  z-40 md:hidden"
    onClick={() => setIsOpen(false)}
  ></div>
)}

    </>
  );
};

export default Sidebar;
