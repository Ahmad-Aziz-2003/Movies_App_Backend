import axios from 'axios';
import ListMovies from '@/components/ListMovies';

const GenreDetail = ({ genre, movies }) => {
  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8">{genre.name} Movies</h1>
        <ListMovies movies={movies} />
    </div>
  );
};

export default GenreDetail;

export async function getServerSideProps({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const genreRes = await axios.get(`${baseUrl}/api/genres/${params.id}`);
    const { genre } = genreRes.data;

    const moviesRes = await axios.get(`${baseUrl}/api/movies`);
    const { movies } = moviesRes.data;

    const genreMovies = movies.filter((movie) => movie.genreId === params.id);

    return {
      props: { genre, movies: genreMovies },
    };
  } catch (error) {
    console.error('Error fetching genre or movies:', error);
    return {
      notFound: true,
    };
  }
}
