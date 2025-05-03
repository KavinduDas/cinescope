import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { MOVIES } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { getMovies } from "@/actions/movies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function MoviesList() {
  const movies = await getMovies();
  if (!movies) {
    return <div>No Movies Found !</div>;
  }
  console.log("Movies :", movies);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Loop through Movies */}
      {movies.map((movie, index) => (
        <div key={`${movie.id}-${index}`} className="">
          <Link href={`/movies/${movie.id}`}>
            <Card className="py-0 overflow-hidden transition-colors border-primary/20 hover:border-primary/50">
              <div className="w-full overflow-hidden aspect-2/3">
                <Image
                  width={300}
                  height={450}
                  src={movie.poster || "./placeholer.svg"}
                  alt={movie.title}
                  className="object-cover w-full h-full hover:scale-105"
                  priority
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
                <p className="text-sm text-muted-foreground">{movie.year}</p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {movie.genres.slice(0, 2).map((genre, index) => (
                    <Badge
                      key={`${genre}-${index}`}
                      variant="outline"
                      className="text-xs border-primary/30 bg-primary/5"
                    >
                      {genre}
                    </Badge>
                  ))}

                  {movie.genres?.length > 2 && (
                    <Badge variant="outline" className="text-sm">
                      +{movie.genres.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-primary">
                    {movie.imdb?.rating}/10
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-primary"
                >
                  Details
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
}
