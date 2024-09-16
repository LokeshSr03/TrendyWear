import express from "express";
import { register } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/:id");
router.route("/register").post(register);
router.route("/login");

export default router;
