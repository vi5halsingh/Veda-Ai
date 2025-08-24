import React from "react";

export default function Login() {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Log in</h1>
          <form className="space-y-5">
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
                src="https://www.svgrepo.com/show/448236/github.svg"
                alt="GitHub"
                className="w-5 h-5 mr-2"
              />
              Continue with GitHub
            </button>
          </div>

          {/* Forgot password + Signup link */}
          <div className="mt-6 flex justify-between text-sm text-gray-600">
            <a href="/forgot-password" className="hover:underline">
              Forgot password?
            </a>
            <a href="/signup" className="text-black font-medium hover:underline">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
