import AddMovieDialog from "./add-movie-dialog";
import MovieData from "./movie-data";
import MovieTable from "./movie-table";

export default function MoviesPage() {
  //16px
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-wider">Movies</h2>
          <p className="text-muted-foreground"> Manage your movie catalog</p>
        </div>

        <AddMovieDialog />
      </div>
      <MovieData />
    </div>
  );
}
