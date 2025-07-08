import AddMovieDialog from "./add-movie-dialog";
import MovieData from "./movie-data";
import MovieSelectors from "./movie-selectors";
import MovieTable from "./movie-table";

export default async function MoviesPage(props) {
  const searchparams = await props.searchParams;
  const query = searchparams?.query || "";

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
      <MovieSelectors />
      <MovieData query={query} />
    </div>
  );
}
