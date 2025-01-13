import mongoose from 'mongoose';

// Define the Order Schema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User who placed the order
      required: true, // Each order must be linked to a user
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to a Product
        quantity: { type: Number, default: 1, required: true }, // Quantity of the product in the order
        price: { type: Number, required: true }, // Price of the product at the time of order
      },
    ],
    totalAmount: {
      type: Number,
      required: true, // Total amount for the order
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    status: {
      type: String,
      default: 'Pending', // Order status: Pending, Shipped, Delivered, etc.
    },
    paymentStatus: {
      type: String,
      default: 'Unpaid', // Payment status: Unpaid, Paid
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Check if the model is already defined to avoid the "OverwriteModelError"
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
