import { getMovieById } from "@/actions/movies";
import MovieLoading from "./movie-loading";

export default async function MovieDetailsPage(props) {
  const { moviesid } = await props.params;
  const movie = await getMovieById(moviesid);

  console.log("Movie", movie);

  return (
    <main className="flex flex-col justify-center px-4 py-16 mx-auto">
      <h1 className="text-center bg-amber-400"> Movie Details </h1>
      <h2 className="py-5 text-center">Movie : ID : {moviesid}</h2>
      <h2 className="py-5 text-center">Movie : Title : {movie?.data?.title}</h2>
      <h2 className="py-5 text-center">Movie : Plot : {movie?.data?.plot}</h2>
      <MovieLoading />
    </main>
  );
}

//  /movie/:id - react router toute parameter
// /movie/[id] - Next.js App Router parameter
// / movie/[...id]
