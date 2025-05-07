import axios from 'axios';
import MovieDetail from '../../../components/MovieDetail';

const MovieDetailsPage = ({ movie }) => {
  return <MovieDetail movie={movie} />;
};

export default MovieDetailsPage;

export async function getStaticPaths() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.get(`${baseUrl}/api/movies`);
  const movies = res.data.movies;

  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
  
    const res = await axios.get(`${baseUrl}/api/movies/${params.id}`);
    const movie = res.data.movie;

    if (!movie) {
      return { notFound: true }; 
    }

    return {
      props: { movie },
      revalidate: 180, 
    };
  } catch (error) {
    console.error('Error fetching movie:', error);
    return { notFound: true }; 
  }
}
