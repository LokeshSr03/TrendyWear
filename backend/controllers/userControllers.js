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
      username: user.username,
      email: user.email,
      address: user.address,
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
      username: user.username,
      email: user.email,
      address: user.address,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid Email and Password");
  }
});

export { register, login };
