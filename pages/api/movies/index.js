// pages/api/movies/index.js
import { connectDB } from "../../lib/db";

export default async function handler(req, res) {
  const conn = await connectDB();
  const db = conn.connection.db;
  const collection = db.collection("movies");

  if (req.method === "GET") {
    try {
      const movies = await collection.find().toArray();
      return res.status(200).json({ movies });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch movies", details: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { movies } = req.body;

      if (!movies || !Array.isArray(movies)) {
        return res.status(400).json({ error: "Invalid data format" });
      }

      const result = await collection.insertMany(movies);
      return res.status(200).json({ message: "Movies added successfully", insertedCount: result.insertedCount });
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong", details: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
