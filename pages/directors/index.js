import useSWR from 'swr';
import DirectorCard from '../../components/DirectorCard';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorsPage() {
  const { data: directorsData, error: directorsError } = useSWR('/api/directors', fetcher);
  const { data: moviesData, error: moviesError } = useSWR('/api/movies', fetcher);

  if (directorsError || moviesError) return <p>Failed to load data</p>;
  if (!directorsData || !moviesData) return <p>Loading directors...</p>;

  const { directors } = directorsData;
  const { movies } = moviesData;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8">Directors</h1>
      {directors && directors.length > 0 ? (
        directors.map((director) => {
          const directedMovies = movies.filter(
            (movie) => movie.directorId === director.id
          );

          return (
            <DirectorCard
              key={director.id}
              name={director.name}
              biography={director.biography}
              movies={directedMovies}
            />
          );
        })
      ) : (
        <p>No directors found.</p>
      )}
    </div>
  );
}
