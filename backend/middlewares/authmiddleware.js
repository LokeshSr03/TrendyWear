import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      throw new Error("Token is not authorized", error);
    }
  } else {
    throw new Error(`Token not Found`);
  }
});

const admin = asyncHandler((req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new Error(`Only Authorized to admin`);
  }
});

export { protect, admin };
