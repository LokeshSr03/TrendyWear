import express from "express";
import { protect } from "../middlewares/authmiddleware.js";
import {
  getProfile,
  login,
  register,
  updateProfile,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/:id").get(protect, getProfile).put(protect, updateProfile);
router.route("/register").post(register);
router.route("/login").post(login);

export default router;
