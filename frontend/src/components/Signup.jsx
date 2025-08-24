import React from "react";

export default function Signup() {
  return (
    <div className="min-h-screen flex">
      {/* Left illustration section */}
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
        <img
          src="https://cdn.openai.com/chatgpt/illustration.svg"
          alt="Chat Illustration"
          className="w-3/4"
        />
      </div>

      {/* Right form section */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign up</h1>
          <form className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
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
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Create account
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
              Sign up with Google
            </button>

            <button className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/448236/github.svg"
                alt="GitHub"
                className="w-5 h-5 mr-2"
              />
              Sign up with GitHub
            </button>
          </div>

          {/* Already have account */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-black font-medium hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
