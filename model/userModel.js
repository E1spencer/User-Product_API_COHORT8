import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]
});

const User = mongoose.model("User", userSchema);

export default User; 

//OR 

//export default mongoose.model("User", userSchema);