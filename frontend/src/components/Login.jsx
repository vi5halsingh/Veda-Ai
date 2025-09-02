import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../config/Api";
import { toast } from "react-toastify";

export default function Login(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      if (!data) return;
      const response = await api.post("/auth/login", data);

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      }
    } catch (error) {
      if (error.status === 404) {
        toast.error("User not found", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          closeOnClick: true,
        });
        return;
      }
      if (error.status === 401) {
        toast.error("Invalid email or password", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          closeOnClick: true,
        });
        return;
      }
      toast.error("Something went wrong", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        closeOnClick: true,
      });
    }
  };
  const handleSetType = (e) => {
    e.preventDefault();
    props.setType((p) => "signup");
    
  };
  return (
    <div className="flex w-full md:w-1/2 items-center justify-center p-8">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Log in</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              required
              name="email"
              value={data?.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              required
              name="email"
              value={data?.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Log in
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Buttons */}
        <div className="space-y-3">
          <button className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          <button className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="w-5 h-5 mr-2"
            />
            Continue with GitHub
          </button>
        </div>

        {/* Forgot password + Signup link */}
        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <NavLink to="/forgot-password" className="hover:underline">
            Forgot password?
          </NavLink>
          <NavLink
            className="text-black font-medium hover:underline"
            onClick={handleSetType}
          >
            Create an account
          </NavLink>
        </div>
      </div>
    </div>
  );
}
