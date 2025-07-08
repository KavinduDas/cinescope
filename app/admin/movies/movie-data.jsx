import MovieTable from "./movie-table";
import { searchMovies } from "@/actions/movies";

export default async function MovieData({ query = "" }) {
  try {
    // const movies = await db.collection("movies").find({}).limit(50).toArray();

    const movies = await searchMovies(query);

    if (movies && movies.data.length > 0) {
      const refinedMovies = movies.data.map((movie, key) => {
        // ✅ Now valid
        return {
          id: movie._id.toString(),
          title: movie.title,
          year: movie.year,
          plot: movie.plot,
          rated: movie.rated,
          genres: Array.isArray(movie.genres) ? movie.genres : [], // use Chatgpt for this error
          poster: movie.poster,
          imdb: movie.imdb,
          runtime: movie.runtime,
          status: movie.status ?? "published",
          directors: movie.directors,
        };
      });

      return <MovieTable movies={refinedMovies} />;
    }
  } catch (error) {
    console.log("Error fetching MOvies", error);
    return (
      <div className="flex justify-center items-center h-[200px] ">
        <p className="font-medium duration-1000 text-destructive animate-pulse">
          No movies available
        </p>
      </div>
    );
  }
  return <div>movie-data</div>;
}
