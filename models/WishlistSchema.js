import mongoose from "mongoose";

// Define the Wishlist Schema
const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // ✅ Correct (Array)
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Export the Wishlist model
export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", wishlistSchema);
