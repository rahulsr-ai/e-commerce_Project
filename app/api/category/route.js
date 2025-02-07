import mongoose from "mongoose";
import Category from "@/models/CategorySchema";


const createCategory = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const newCategory = await Category.create({
      name: "Electronics",
      description: "All electronic gadgets",
    });
    

    console.log("Category Created:", newCategory);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating category:", error);
  }
};

createCategory();
