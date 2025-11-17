import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

import { useDispatch } from "react-redux";
import { loadCartOnLogin } from "../redux/cartSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Load this user's cart into Redux
      dispatch(loadCartOnLogin());

      toast.success("Login successful!", { position: "top-right", autoClose: 2000 });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed", { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const res = await axios.post("http://localhost:5000/api/auth/google", { token });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Load this user's cart into Redux
      dispatch(loadCartOnLogin());

      toast.success("Google login successful!", { position: "top-right", autoClose: 2000 });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Google login failed:", err);
      toast.error(err.response?.data?.message || "Google login failed", { position: "top-right", autoClose: 3000 });
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed", { position: "top-right", autoClose: 3000 });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-[#2c0d0d] px-4 md:mt-10">
        <ToastContainer />
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 text-gray-800">
          <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-all mb-4"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />

          <p className="text-center text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-pink-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
