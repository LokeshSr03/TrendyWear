import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const register = asyncHandler(async (req, res) => {
  const { username, email, password, address } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new Error("User already exist");
  }

  const user=
});
