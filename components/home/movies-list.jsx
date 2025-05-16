import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { MOVIES } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { getMovies } from "@/actions/movies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MovieCard from "./movie-card";

export default async function MoviesList() {
  const movies = await getMovies();
  if (!movies || movies.length === 0) {
    return (
      <div className="py-12 font-medium text-center text-foreground">
        No Movies Found !
      </div>
    );
  }
  console.log("Movies :", movies);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Loop through Movies */}
      {movies.map((movie, index) => (
        <div key={`${movie.id}-${index}`} className="">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Loop movies static */}
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
    </div>
  );
}
