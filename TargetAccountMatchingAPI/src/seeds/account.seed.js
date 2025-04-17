import mongoose from "mongoose";
import dotenv from "dotenv";
import Account from "../models/Account.model.js";
import { connectDB } from "../lib/db.js";

dotenv.config();

const sampleAccounts = [
  {
    accountName: "TechCorp",
    industry: "Information Technology",
    matchScore: 86,
  },
  {
    accountName: "HealthPlus",
    industry: "Healthcare",
    matchScore: 74,
  },
  {
    accountName: "EduSmart",
    industry: "Education",
    matchScore: 91,
  },
  {
    accountName: "AutoDrive Inc.",
    industry: "Automotive",
    matchScore: 67,
  },
  {
    accountName: "FinSecure",
    industry: "Finance",
    matchScore: 88,
  },
];

const seedData = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    await Account.insertMany(sampleAccounts);
    console.log("Sample accounts seeded");

    mongoose.connection.close();
    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
