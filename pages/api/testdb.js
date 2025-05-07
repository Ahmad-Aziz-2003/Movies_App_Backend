// pages/api/testdb.js
import { connectDB } from "../lib/db";

export default async function handler(req, res) {
  try {
    await connectDB();
    res.status(200).json({ message: "DB connection successful ✅" });
  } catch (err) {
    res.status(500).json({ error: "DB connection failed ❌", details: err.message });
  }
}
