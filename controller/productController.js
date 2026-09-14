import productModel from "../model/productModel.js";
import userModel from "../model/userModel.js";

// Create/Upload a new product

/*
export const uploadProduct = async (req, res) => {
  try {
    const getUserId = await userModel.findById(req.body.userId);
    if (!getUserId) {
      return res.status(404).json({ message: "User not found" });
    }
    const { name, description, price, category, stock, quantity, image } = req.body;
    const product = await productModel.create({ name, description, price, category, stock, quantity, image });
    await getUserId.products.push(product._id);
    await getUserId.save();
    res.status(201).json({ 
      message: "Product uploaded successfully", 
      data: product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
*/

export const uploadProduct = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const {
      name,
      description,
      price,
      category,
      stock,
      quantity,
      image
    } = req.body;

    const product = await productModel.create({
      name,
      description,
      price,
      category,
      stock,
      quantity,
      image,
      user: userId
    });

    user.products.push(product._id);

    await user.save();

    return res.status(201).json({
      message: "Product uploaded successfully",
      data: product
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

// Get all products in the database
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    return res.status(200).json({
      message: "All products fetched successfully",
      data: products
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

// Get all products by userId
export const getUserProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel
      .findById(userId)
      .populate("products");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User products fetched successfully",
      data: user.products
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};