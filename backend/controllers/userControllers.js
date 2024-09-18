import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const register = asyncHandler(async (req, res) => {
  const { username, email, password, address } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new Error("User already exist");
  }

  const user = await User.create({ username, email, password, address });

  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      address: user.address,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      address: user.address,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid Email and Password");
  }
});

const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (user) {
    res.json({
      username: user.username,
      email: user.email,
      address: user.address,
    });
  } else {
    throw new Error("User Data not Found");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, email, address, password } = req.body;

  const user = await User.findById(id);

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.address = address || user.address;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      address: updatedUser.address,
      token: generateToken(updatedUser._id),
    });
  } else {
    throw new Error("User not found");
  }
});

export { register, login, getProfile, updateProfile };
