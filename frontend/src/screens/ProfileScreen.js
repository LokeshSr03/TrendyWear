import React, { useState } from "react";

const ProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle profile update logic here (API call, validation, etc.)
    const updatedProfile = {
      username,
      email,
      address,
      password,
    };
    console.log(updatedProfile);

    // Add logic to update profile (e.g., call an API and handle success/failure)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Profile
        </h2>

        {/* Username Field */}
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500"
            required
          />
        </div>

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

        {/* Address Field */}
        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500"
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

        {/* Update Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileScreen;
