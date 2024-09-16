import { json } from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const createProducts = asyncHandler(async (req, res) => {
  const { name, description, price, stock } = req.body;

  const product = await Product.create({ name, description, price, stock });

  if (product) {
    res.status(400).json(product);
  } else {
    throw new Error(`Product not found`);
  }
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    res.json(products);
  } else {
    throw new Error(`No Products Available`);
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (product) {
    res.json(product);
  } else {
    throw new Error(`No product Available`);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  const product = await Product.findById(id);

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;

    const updatedproduct = await product.save();

    res.json({
      name: updatedproduct.name,
      description: updatedproduct.description,
      price: updatedproduct.price,
      stock: updatedproduct.stock,
    });
  } else {
    throw new Error(`product not found`);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (product) {
    await Product.deleteOne(product);
    res.json({ msg: `Product deleted successfully` });
  }
});

export {
  createProducts,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
