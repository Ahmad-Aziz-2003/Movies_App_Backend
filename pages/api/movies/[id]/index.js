import { connectDB } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET method allowed" });
  }

  const { id } = req.query;

  try {
    const conn = await connectDB();
    const db = conn.connection.db;
    //const movie = await db.collection("movies").findOne({ _id: new ObjectId(id) });
    const movie = await db.collection("movies").findOne({ id });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.status(200).json({ movie });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong", details: err.message });
  }
}
