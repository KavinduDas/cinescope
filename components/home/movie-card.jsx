"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieCard({ movie }) {
  const [posterUrl, setPosterUrl] = useState(movie.poster);
  //   return <MovieCardSkeleton />;

  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="py-0 overflow-hidden transition-colors border-primary/20 hover:border-primary/50">
        <div className="w-full overflow-hidden aspect-2/3">
          <Image
            width={300}
            height={450}
            src={posterUrl || "/images/movie-placeholder.png"}
            alt={movie.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            priority
            onError={() => setPosterUrl("/images/movie-placeholder.png")}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
          <p className="text-sm text-muted-foreground">
            {movie.year} • {movie.runtime} min
          </p>
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
              <Badge variant="outline" className="text-xs">
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
          <Button variant="ghost" size="sm" className="hover:text-primary">
            Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg">
      <Skeleton className="w-full aspect-2/3" />
      <div className="p-4 space-y-2">
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>

      <div className="flex justify-between gap-2 pt-2">
        <Skeleton className="w-16 h-6 rounded-full" />
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>
    </div>
  );
}
