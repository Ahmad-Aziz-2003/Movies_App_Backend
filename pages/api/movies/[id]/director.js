import { connectDB } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET method allowed" });
  }

  const { id } = req.query;

  try {
    const conn = await connectDB();
    const db = conn.connection.db;

    // Step 1: Find movie by its id
    const movie = await db.collection("movies").findOne({ id });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const directorId = movie.directorId;
    if (!directorId) {
      return res.status(404).json({ error: "Director not assigned in movie" });
    }

    // Step 2: Get director info
    const director = await db.collection("directors").findOne({ id: directorId });
    if (!director) {
      return res.status(404).json({ error: "Director not found" });
    }

    // Optional: Get all movies by this director
    //const directedMovies = await db.collection("movies").find({ "directorId": directorId }).toArray();

    //return res.status(200).json({ director, directedMovies });
    return res.status(200).json({ director});
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong", details: err.message });
  }
}
