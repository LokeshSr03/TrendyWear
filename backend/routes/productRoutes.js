import express from "express";
import { protect, admin } from "../middlewares/authmiddleware.js";
import {
  createProducts,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/").post(protect, admin, createProducts).get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
