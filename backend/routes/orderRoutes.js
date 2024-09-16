import express from "express";
import {
  cancelOrder,
  createOrder,
  getOrderById,
  getOrders,
} from "../controllers/orderControllers.js";
import { protect } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, getOrders);
router.route("/:id").get(protect, getOrderById).delete(protect, cancelOrder);

export default router;
