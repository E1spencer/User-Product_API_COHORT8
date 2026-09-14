import express from "express";

export const userRouter = express.Router();

import { createUser, getAllUsers, getSingleUser, updateUser, deleteUser } from "../controller/userController.js";

// Create a new user
userRouter.post("/new-user", createUser);

// Get all users
userRouter.get("/get-all-users", getAllUsers);

// Get a single user
userRouter.get("/get-one-user/:id", getSingleUser);

// Update a user
userRouter.patch("/update-user/:id", updateUser);

// Delete a user
userRouter.delete("/delete-user/:userId", deleteUser);