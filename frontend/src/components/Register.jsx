import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const removeAvatar = () => setAvatar(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("password", formData.password);
      if (avatar) data.append("avatar", avatar);

      await axios.post("http://localhost:5000/api/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ Show toast
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      });

      // Navigate after a short delay so user can see the toast
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
      toast.error(err.response?.data?.message || "Registration failed", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
  <>

  <Header/>
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-[#2c0d0d] md:mt-25 px-4">
      <ToastContainer />
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 text-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {error && (
          <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          {/* Avatar upload */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-500">Upload Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {avatar && (
              <div className="relative mt-2 w-24 h-24">
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="avatar preview"
                  className="w-full h-full object-cover rounded-full border"
                />
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* Register button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-all mb-4"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  </>
  );
};

export default Register;
