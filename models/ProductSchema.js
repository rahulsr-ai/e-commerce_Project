import mongoose from 'mongoose';

// Define the Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Product name is required
      trim: true, // Removes extra spaces
    },
    description: {
      type: String,
      required: true, // Description is required
      trim: true,
    },
    price: {
      type: Number,
      required: true, // Price is required
      min: 0, // Price cannot be negative
    },
    category: {
      type: String,
      required: true, // Category is required
      trim: true,
    },
    imageUrl: {
      type: String, 
      required: true, // Image URL is required
    },
    stock: {
      type: Number,
      required: true, // Stock is required
      default: 0, // Default stock to 0 if not provided
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // This is the reference to the User Schema
      required: true, // Each product must belong to a user (e.g., a seller)
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Product model
export default mongoose.model('Product', productSchema);
