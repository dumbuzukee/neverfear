import mongoose from "mongoose";

export const connectMongoDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.log("No MONGODB_URI was found in environment variables");
        process.exit(1);
    };

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "neverfear",
        });
    }
    catch(error) {
        console.log("An error occurred while connecting to mongodb:", error);
        process.exit(1);
    };
};