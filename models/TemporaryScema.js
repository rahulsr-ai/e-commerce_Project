import mongoose from "mongoose";

const TemporaryUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true,  },
    verificationCode: { type: Number, required: true },
    isVerified: { type: Boolean, default: false },
    codeGeneratedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    collection: "temporaryUsers", // Explicitly define the collection name
  }
);

export default mongoose.models.TemporaryUser || mongoose.model("TemporaryUser", TemporaryUserSchema);
