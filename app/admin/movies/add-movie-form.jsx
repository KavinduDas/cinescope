"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createMovie } from "@/actions/movies";

export function AddMovieForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const year = formData.get("year");
    const director = formData.get("director");
    const genre = formData.get("genre");
    const rating = formData.get("rating");
    const overview = formData.get("overview");
    const runtime = formData.get("runtime");
    const backdrop_url = formData.get("backdrop_url");
    const Poste_URL = formData.get("Poste_URL");
    const Moviestatus = formData.get("status");

    console.log({
      title,
      year,
      director,
      genre,
      rating,
      overview,
      runtime,
      backdrop_url,
      Poste_URL,
      Moviestatus,
    });

    setIsSubmitting(true);

    const response = await createMovie({
      title,
      year,
      directors: [director],
      genre: [genre],
      rating,
      imdb: { rating },
      plot: overview,
      runtime,
      backdrop_url,
      Poste_URL,
      status: Moviestatus,
      lastUpdated: new Date().toISOString(),
    });

    setIsSubmitting(false);
    if (response?.success) {
      console.log(response);
    }

    // setTimeout(() => setIsSubmitting(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-5">
          <Label htmlFor="title" className="font-bold">
            Title
          </Label>
          <Input id="title" name="title" placeholder="Movie Title" required />
        </div>
        <div className="space-y-4 ">
          <Label htmlFor="year" className="font-bold">
            Year
          </Label>
          <Select id="year" name="year">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 ">
          <Label htmlFor="genre" className="font-bold">
            Genre
          </Label>
          <Select id="genre" name="genre">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="action">Action</SelectItem>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="crime">Crime</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 ">
          <Label htmlFor="director" className="font-bold">
            Director
          </Label>
          <Input id="director" name="director" placeholder="Movie director" />
        </div>

        <div className="space-y-4 ">
          <Label htmlFor="rating" className="font-bold">
            Rating
          </Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Rating"
          />
        </div>

        <div className="space-y-4 ">
          <Label htmlFor="runtime" className="font-bold">
            Runtime Minutes
          </Label>
          <Input
            id="runtime"
            name="runtime"
            type="number"
            min="0"
            max="400"
            step="0.1"
            placeholder="Runtime"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="overview" className="font-bold">
          OverView
        </Label>
        <Textarea
          id="overview"
          name="overview"
          placeholder="Movie Description"
          className="max-h-[100px]"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-5">
          <Label htmlFor="backdrop_url" className="font-bold">
            Back Drop URL
          </Label>
          <Input
            id="backdrop_url"
            name="backdrop_url"
            placeholder="backdrop_url"
            required
          />
        </div>

        <div className="space-y-5">
          <Label htmlFor="Poste_URL" className="font-bold">
            Poste URL
          </Label>
          <Input id="Poste_URL" name="Poste_URL" placeholder="Poste_URL" />
        </div>

        <div className="space-y-4 ">
          <Label htmlFor="status" className="font-bold">
            Status
          </Label>
          <Select id="status" name="status">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Staus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding" : "Add Movie"}
        </Button>
      </DialogFooter>
    </form>
  );
}
