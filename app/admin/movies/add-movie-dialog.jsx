"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddMovieForm } from "./add-movie-form";

export default function AddMovieDialog() {
  const [showAddMovie, setShowAddMovie] = useState(false);
  return (
    <Dialog open={showAddMovie} onOpenChange={setShowAddMovie}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Movie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Movie</DialogTitle>
          <DialogDescription>
            Fill in details to add a new Movie
          </DialogDescription>
        </DialogHeader>
        {/* Adding a movie form  */}
        <AddMovieForm />
      </DialogContent>
    </Dialog>
  );
}
