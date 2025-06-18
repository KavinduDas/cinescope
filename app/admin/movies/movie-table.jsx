"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MOVIES } from "@/lib/data";
import UpdateMovieDialog from "./update-movie-dialog";
import DeleteMovieDialog from "./delete-movie";

export default function MovieTable({ movies }) {
  const router = useRouter();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  console.log("Movies", movies);

  const toggleUpdateDialog = (open) => {
    //using requestAnimationFrame to ensure the dialog opens after the state update
    requestAnimationFrame(() => setShowUpdateDialog(open || !showUpdateDialog));
  };

  const toggleDeleteDialog = (open) => {
    requestAnimationFrame(() => setShowDeleteDialog(open || !showDeleteDialog));
  };
  const handleDeleteMovie = async (movieId) => {
    const resp = await deleteMovie(movieId);
    if (resp?.success) {
      setSelectedMovie(null);
      toggleDeleteDialog(false);
      router.refresh();
    }
  };

  const getMovieStaus = (status) => {
    switch (status) {
      case "published":
        return "text-green-800 bg-green-100";
      case "draft":
        return "text-yellow-800 bg-yellow-100";
      case "archived":
        return "text-red-800 bg-red-100";
      default:
        return "text-gray-800 bg-red-800";
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableCaption className="sr-only">Movies Table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie, key) => (
            <TableRow key={movie.id}>
              <TableCell className="font-medium">{key + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    src={movie.poster || "/images/movie-placeholder.png"}
                    alt={movie.title}
                    height={40}
                    width={20}
                    className="object-cover h-10 rounded w-7"
                  />
                  {movie.title}
                </div>
              </TableCell>

              <TableCell>{movie.year}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {movie.genres.map((genre) => (
                    <Badge key={genre} variant="outline" className="text-xs">
                      {genre},
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{Number(movie?.imdb?.rating).toFixed(1)}</TableCell>
              <TableCell className="capitalize">
                <Badge className={getMovieStaus(movie.status)}>
                  {movie.runtime}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
                      <span className="sr-only">Open Menu</span>
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedMovie(movie);
                        toggleUpdateDialog(true);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setSelectedMovie(movie);
                        toggleDeleteDialog(true);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UpdateMovieDialog
        open={showUpdateDialog}
        onOpenChange={toggleUpdateDialog}
        movie={selectedMovie}
      />
      <DeleteMovieDialog
        open={showDeleteDialog}
        onOpenChange={toggleDeleteDialog}
        movie={selectedMovie}
        onConfirm={(id) => handleDeleteMovie(id)}
        isLoading={false}
      />
    </div>
  );
}
