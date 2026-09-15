import userModel from "../model/userModel.js";
import bcrypt, { genSalt } from "bcrypt";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    const user = await userModel.create({ name, email, password: hashedPassword });
    res.status(201).json({ 
      message: "User created successfully", 
      data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login User - {Email} and Password verification 
export const loginUser = async (req, res) => {
  try{
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(404).json({ message : "Are you sure you signed up?"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      return res.status(404).json({ message : "Invalid Credentials! Check that you have entered the correct email/password!"});
    }
    return res.status(200).json({ message : "Login Successful", data : user});

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const getAll = await userModel.find();
    return res.status(200).json({
      message: "All users fetched successfully",
      data: getAll
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a single user by Parameter (id)
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getSingle = await userModel.findById(id);
    if (!getSingle) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      data: getSingle
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Update a user by Parameter (id)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const update = await userModel.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true, runValidators: true }
    );
    if (!update) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User updated successfully",
      data: update
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a user by Parameter (id)
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};