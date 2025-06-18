import { db } from "@/lib/db";
import MovieTable from "./movie-table";

export default async function MovieData() {
  try {
    const movies = await db.collection("movies").find({}).limit(50).toArray();
    if (movies.length > 0) {
      // const refinedMovies = movies.map((movie, key) => ({
      //   id: key + 1,
      //   title: movie.title,
      //   plot: movie.plot,
      //   rated: movie.rated,
      //   genres: movie.genres,
      //   poster: movie.poster,
      //   imdb: movie.imdb,
      //   runtime: movie.runtime,
      //   status: movie.status,
      // }));
      const refinedMovies = movies.map((movie, key) => {
        console.log("Movie Status", movie.year); // ✅ Now valid
        return {
          id: movie._id.toString(),
          title: movie.title,
          year: movie.year,
          plot: movie.plot,
          rated: movie.rated,
          genres: movie.genres,
          poster: movie.poster,
          imdb: movie.imdb,
          runtime: movie.runtime,
          status: movie.status,
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
