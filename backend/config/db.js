const mongoose = require("mongoose");

const connectDB = async () => {
   try {
      console.log("Connecting to MongoDB URI:", process.env.MONGO_URI); // Log MONGO_URI value

      const connection = await mongoose.connect(process.env.MONGO_URI, {

      });
      console.log("MongoDB Connected:", connection.connection.host);
   } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1); // Exit process with failure
   }
};

module.exports = connectDB;
