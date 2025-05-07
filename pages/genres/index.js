import axios from 'axios';
import GenreList from '../../components/GenreList';

const Genres = ({ genres }) => {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8">Genres</h1>
      <GenreList genres={genres} />
    </div>
  );
};

export default Genres;

export async function getServerSideProps() {
 
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await  axios.get(`${baseUrl}/api/genres`); 
    const { genres } = response.data;
    return {
      props: {
        genres,
      },

    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      props: {
        genres: [],
      },
    };
  }
}
