// pages/index.js
import { useRouter } from 'next/router';
import ListMovies from '@/components/ListMovies';
import axios from 'axios';
const Home = ({ trendingMovies }) => {
  const router = useRouter();
  return (
    <div className="min-h-screen py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8">
        Trending Movies
      </h1>
      <ListMovies movies={trendingMovies} />
      <div className="mt-8 text-center">
        <button
          onClick={() => router.push('/genres')}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
        >
          Browse Genres
        </button>
      </div>
    </div>
  );
};

export default Home;
export async function getStaticProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await  axios.get(`${baseUrl}/api/movies`); 
    const { movies } = response.data;

    const trendingMovies = movies.filter((movie) => movie.rating >= 8);

    return {
      props: {
        trendingMovies,
      },
      revalidate: 60, 
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      props: {
        trendingMovies: [],
      },
    };
  }
}