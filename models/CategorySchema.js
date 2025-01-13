import mongoose from 'mongoose';

// Define the Category Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Category name is required
      trim: true, // Removes extra spaces
      unique: true, // Category name must be unique
    },
    description: {
      type: String,
      trim: true, // Removes extra spaces
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Check if the model is already defined to avoid the "OverwriteModelError"
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;