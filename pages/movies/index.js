// pages/movies.js
import { useState } from 'react';
import ListMovies from '@/components/ListMovies';
import axios from 'axios';
const Movies = ({ movies, genres }) => {
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleFilter = (genreId) => {
    if (genreId) {
      const filtered = movies.filter((movie) => movie.genreId === genreId);
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  };

  return (
    <div className="min-h-screen  py-10 px-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8">All Movies</h1>

      <div className="flex gap-4 justify-center mb-8 flex-wrap">
        <button
          onClick={() => handleFilter(null)}
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
        >
          All Movies
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleFilter(genre.id)}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
          >
            {genre.name}
          </button>
        ))}
      </div>

   
        <ListMovies movies={filteredMovies} />
  
    </div>
  );
};

export default Movies;

// export async function getStaticProps() {
//   const filePath = path.join(process.cwd(), 'data', 'data.json');
//   const dataJson = await fs.readFile(filePath, 'utf-8');
//   const data = JSON.parse(dataJson);
//   const { movies, genres } = data;

//   return {
//     props: {
//       movies,
//       genres,
//     },
//   };
// }
export async function getStaticProps() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Fetch movies and genres from API routes
  const [moviesRes, genresRes] = await Promise.all([
    axios.get(`${baseUrl}/api/movies`),
    axios.get(`${baseUrl}/api/genres`),
  ]);

  return {
    props: {
      movies: moviesRes.data.movies,
      genres: genresRes.data.genres,
    },
    revalidate: 60, // Optional: ISR
  };
}