import mongoose from 'mongoose';

// Define the Wishlist Schema
const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product model
        name: { type: String, required: true },
        imageUrl: { type: String },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Export the Wishlist model
export default mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
