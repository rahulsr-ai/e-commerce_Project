/* eslint-disable camelcase */
//@ts-nocheck
import mongoose from "mongoose";

// Initialize a connection object to keep track of the database connection
const connection = {};

// Function to connect to the MongoDB database
export const dbConnect = async () => {
  
  // Check if already connected to the database
  if (connection.isConnected) {
    console.log("Already connected to the database ----------------------------");
    return; // Exit if already connected
  }

  try {
    // Attempt to connect to the database using Mongoose
   
    const db = await mongoose.connect(process.env.MONGO_URI || "", {});

    // Store the connection state (1 means connected)
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully- -------------------------------------");

    return mongoose.connection; // Exit the function after successful connection

  } catch (error) {
    // Handle any connection errors

    // Exit the process if the connection fails
    process.exit();
  }
};
