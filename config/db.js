import mongoose from "mongoose";

export const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI, {
           serverSelectionTimeoutMS: 5000,
       });
       console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('Error in DB Connection');
        console.error(`Error: ${error.message}`);
        process.exit(1);
    } 
}