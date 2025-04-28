import { Button } from "@/components/ui/button";
import MoviesList from "./movies-list";
import { Suspense } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
export default function FeaturedMovies() {
  return (
    <section id="featured" className="container px-4 py-12 md:px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Movies</h2>
          <p className="text-muted-foreground">Explore the latest Movies</p>
        </div>

        <Button variant="outline">View All</Button>
      </div>
      <div className="space-y-6">
        <div className="p-4 border rounded-lg shadow-xs border-primary/20 bg-card">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute w-4 h-4 -translate-y-1/2 text-primary/70 left-3 top-1/2" />
              <Input
                placeholder="Search movies by title or by director"
                className="pl-8 border-primary/20"
              />
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="h-96 animate"></div>}>
          <MoviesList />
        </Suspense>
      </div>
    </section>
  );
}
