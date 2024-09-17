import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, dispatch, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle login logic here (API call, validation, etc.)
    dispatch(loginUser(email, password));
  };

  return (
    <>
      {loading && (
        <div class="loader absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div class="w-16 h-16 border-t-4 border-t-gray-200 border-r-4 border-r-gray-200 border-b-4 border-b-gray-200 border-l-4 border-l-gray-200 rounded-full animate-spin">
            loading
          </div>
        </div>
      )}
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Login
          </h2>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition duration-300"
          >
            Login
          </button>

          {/* Link to Register Page */}
          <div className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginScreen;
