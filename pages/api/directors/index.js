// pages/api/movies/index.js
import { connectDB } from "../../lib/db";

export default async function handler(req, res) {
  const conn = await connectDB();
  const db = conn.connection.db;
  const collection = db.collection("directors");

  if (req.method === "GET") {
    try {
      const directors = await collection.find().toArray();
      return res.status(200).json({ directors });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch directors", details: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { directors } = req.body;

      if (!directors || !Array.isArray(directors)) {
        return res.status(400).json({ error: "Invalid data format" });
      }

      const result = await collection.insertMany(directors);
      return res.status(200).json({ message: "directors added successfully", insertedCount: result.insertedCount });
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong", details: err.message });
    }
  }

  // If method is not GET or POST
  return res.status(405).json({ error: "Method not allowed" });
}
