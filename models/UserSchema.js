import mongoose from "mongoose";

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider !== "google"; // Google login users ke liye required nahi hoga
      },
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: { 
      type: Boolean,
      required: true,
      default: false,
    },
    authProvider: { 
      type: String, // "local" ya "google"
      default: "local",
    },
    authProviderId: { 
      type: String, // Google ke users ke liye unique ID
    },
    image: { type: [String], default: [] },

    
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    orders: [
      {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        status: { type: String, default: "Pending" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Export the User model, checking if it already exists
const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
