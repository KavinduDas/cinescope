"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// import { Plus } from "lucide-react";
import { UpdateMovieForm } from "./update-movie-form";

export default function UpdateMovieDialog({ open, onOpenChange, movie }) {
  console.log("Movie", movie);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Movie</DialogTitle>
          <DialogDescription>
            Fill in details to Update the movie
          </DialogDescription>
        </DialogHeader>
        {/* Adding a movie form  */}
        <UpdateMovieForm onClose={onOpenChange} movie={movie} />
      </DialogContent>
    </Dialog>
  );
}
