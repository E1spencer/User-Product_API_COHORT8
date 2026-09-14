import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRoutes.js";
import { productRouter } from "./routes/productRoutes.js";

dotenv.config();

const atlas_string = process.env.ATLAS_STRING;

// Connect to MongoDB using Mongoose (atlas connection string)
mongoose.connect(atlas_string)
.then(() => {
  console.log("Connected to MongoDB");// this is a test comment to check if the connection is successful
})
.catch(err => console.error("Error connecting to MongoDB:", err)); /*.catch((error) => { console.error("Error connecting to MongoDB:", error);});*/

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});