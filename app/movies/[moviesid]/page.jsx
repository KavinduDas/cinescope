import { getMovieById } from "@/actions/movies";
import MovieLoading from "./movie-loading";
// import { resolve } from "styled-jsx/css";

export async function generateMetadata(props) {
  const { moviesid } = await props.params;
  const movie = await getMovieById(moviesid);

  return {
    title: movie?.data?.title
      ? `Cinescope | ${movie.data.title}`
      : "Cinescope | Movie Details",
    description: movie?.data?.plot ?? "Find Your movie ratings",
  };
}
//server Component
export default async function MovieDetailsPage(props) {
  const { moviesid } = await props.params;
  const movie = await getMovieById(moviesid);
  // Delay for demonstation od laoding
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // console.log("Movie", movie);

  if (!movie || !movie.data) {
    throw new Error("Movie Not Found");
  }

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
