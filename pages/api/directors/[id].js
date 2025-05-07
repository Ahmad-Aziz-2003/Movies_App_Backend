import { connectDB } from "../../lib/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET method allowed" });
  }

  const { id } = req.query;

  try {
    const conn = await connectDB();
    const db = conn.connection.db;

    // Find the director by id field (not _id)
    const director = await db.collection("directors").findOne({ id });

    if (!director) {
      return res.status(404).json({ error: "Director not found" });
    }

    // Find all movies that this director directed
    const movies = await db
      .collection("movies")
      .find({ "directorId": id })
      .toArray();

    return res.status(200).json({
      director,
      moviesDirected: movies
    });

  } catch (err) {
    return res.status(500).json({ error: "Something went wrong", details: err.message });
  }
}
