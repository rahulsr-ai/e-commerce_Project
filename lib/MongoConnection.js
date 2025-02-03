import mongoose from "mongoose";

const Databaseconnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

export default Databaseconnection;
