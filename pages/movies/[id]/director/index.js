import axios from 'axios';
const DirectorDetails = ({ director }) => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{director.name}</h2>
      <p className="text-gray-700 text-lg leading-relaxed italic">{director.biography}</p>
    </div>
  );
};

export default DirectorDetails;


export async function getStaticPaths() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ;
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
  
    const res = await axios.get(`${baseUrl}/api/movies/${params.id}/director`);
    const director = res.data.director;

    if (!director) {
      return { notFound: true }; 
    }

    return {
      props: { director },
      revalidate: 180, 
    };
  } catch (error) {
    console.error('Error fetching movie:', error);
    return { notFound: true }; 
  };
}

