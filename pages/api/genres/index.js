// pages/api/genres/index.js
import { connectDB } from "../../lib/db";

export default async function handler(req, res) {
  const conn = await connectDB();
  const db = conn.connection.db;
  const collection = db.collection("genres");

  if (req.method === "GET") {
    try {
      const genres = await collection.find().toArray();
      return res.status(200).json({ genres });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch genres", details: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { genres } = req.body;

      if (!genres || !Array.isArray(genres)) {
        return res.status(400).json({ error: "Invalid data format" });
      }

      const result = await collection.insertMany(genres);
      return res.status(200).json({ message: "genres added successfully", insertedCount: result.insertedCount });
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong", details: err.message });
    }
  }

  // If method is not GET or POST
  return res.status(405).json({ error: "Method not allowed" });
}
