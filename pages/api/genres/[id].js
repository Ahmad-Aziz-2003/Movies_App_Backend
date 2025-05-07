import { connectDB } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET method allowed" });
  }

  const { id } = req.query;

  try {
    const conn = await connectDB();
    const db = conn.connection.db;

    // Get genre info
    const genre = await db.collection("genres").findOne({ id });
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    // Get movies with this genre ID
    const movies = await db
      .collection("movies")
      .find({ "genreId": id }) 
      .toArray();

    return res.status(200).json({ genre, movies });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong", details: err.message });
  }
}
