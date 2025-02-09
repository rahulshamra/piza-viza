import mongoose from "mongoose";
import { NextResponse } from "next/server";
import carddata from "../models/cartdata";
import pizzadata from "../models/pizzadata";
async function connectDB() {
    try {
        if (mongoose.connection.readyState === 0) {
            const MongoURI=process.env.DB_URL
            await mongoose.connect(MongoURI);
            console.log("Connected to MongoDB");
        } else {
            console.log("Already connected to MongoDB"); 
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to database");
    }
}
export async function POST(req) {
    try {
        await connectDB();
        const menuData =  await req.json();
     await pizzadata.insertMany(menuData);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}