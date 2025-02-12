import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Optional
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }, // Optional
    images: { type: [String], default: [] }, // 🖼️ Image URLs array with default []
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ **Slug Generate Hook**
productSchema.pre("save", function (next) {
  if (!this.slug || this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// ✅ **Check if model already exists before compiling**
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
