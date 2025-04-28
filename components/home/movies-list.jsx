import { Card } from "@/components/ui/card";
// import { MOVIES } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { getMovies } from "@/actions/movies";

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
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
}
