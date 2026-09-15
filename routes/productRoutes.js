import express from "express";
import { uploadProduct, getAllProducts, getUserProducts } from "../controller/productController.js";
import upload from "../config/multer.js";

export const productRouter = express.Router();

// Upload a new product
productRouter.post("/upload-product/:userId", upload.single("image"), uploadProduct);

// Get all products
productRouter.get("/get-all-products", getAllProducts);

//Get all products by userId
productRouter.get("/user-products/:userId", getUserProducts);
