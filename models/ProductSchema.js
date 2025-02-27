import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    images: [{ type: String }],
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isOnDeal: { type: Boolean, default: false }
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });


// Pre-save hook to generate slug
productSchema.pre("save", function (next) {
  if (!this.slug || this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Product = mongoose.models?.Product || mongoose.model("Product", productSchema);
export default Product;
