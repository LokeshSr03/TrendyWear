import express from "express";

const router = express.Router();

router.route("/:id");
router.route("/register");
router.route("/login");

export default router;
