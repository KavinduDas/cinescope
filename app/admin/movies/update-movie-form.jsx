"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";

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
import { updateMovie } from "@/actions/movies";

export function UpdateMovieForm({ onClose, movie }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Controlled selected year state
  const [title, setTitle] = useState(movie?.title || "");
  const [director, setDirector] = useState(movie?.directors.at(0) || "");
  const [selectedYear, setSelectedYear] = useState(movie?.year || null);
  const [selectedGenres, setSelectedGenres] = useState(
    movie?.genres.at(0) || ""
  );
  const [rating, setRating] = useState(movie?.imdb?.rating || "");
  const [runtime, setRuntime] = useState(movie?.runtime || "");
  const [overview, setOverview] = useState(movie?.plot || "");
  const [poster, setPoster] = useState(movie?.poster || "");
  const [backdrop, setBackdrop] = useState(movie?.backdrop || "");
  const [status, setStatus] = useState(movie?.status || "");

  // Reset the fields
  const handleClose = () => {
    setSelectedYear(null);
    setSelectedGenres(null);
    onClose(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // const title = formData.get("title");
    // const year = formData.get("year");
    // const director = formData.get("director");
    // const genre = formData.get("genre");
    // const rating = formData.get("rating");
    // const overview = formData.get("overview");
    // const runtime = formData.get("runtime");
    const backdrop_url = formData.get("backdrop_url");
    const Poste_URL = formData.get("Poste_URL");
    const Moviestatus = formData.get("status");

    console.log({
      title,
      year: selectedYear,
      director,
      genres: [selectedGenres],
      rating,
      overview,
      runtime,
      backdrop_url,
      Poste_URL,
      Moviestatus,
    });

    setIsSubmitting(true);

    const response = await updateMovie(movie?.id, {
      title,
      year: selectedYear,
      directors: [director],
      genres: [selectedGenres],
      imdb: { rating: Number(rating) },
      runtime,
      plot: overview,
      poster,
      backdrop,
      status,
      lastupdated: new Date().toISOString(),
    });

    setIsSubmitting(false);
    if (response?.success) {
      console.log(response);
      handleClose();
      router.refresh();
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
          <Input
            id="title"
            name="title"
            placeholder="Movie Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="space-y-4 ">
          <Label htmlFor="year" className="font-bold">
            Year
          </Label>
          <Select
            id="year"
            name="year"
            onValueChange={setSelectedYear}
            value={selectedYear}
          >
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
          <Select
            id="genre"
            name="genre"
            onValueChange={setSelectedGenres}
            value={selectedGenres}
          >
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
          <Input
            id="director"
            name="director"
            placeholder="Movie director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
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
            value={rating}
            onChange={(e) => setRating(e.target.value)}
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
            value={runtime}
            onChange={(e) => setRuntime(e.target.value)}
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
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
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
            value={backdrop}
            onChange={(e) => setBackdrop(e.target.value)}
          />
        </div>

        <div className="space-y-5">
          <Label htmlFor="Poste_URL" className="font-bold">
            Poste URL
          </Label>
          <Input
            id="Poste_URL"
            name="Poste_URL"
            placeholder="Poste_URL"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </div>

        <div className="space-y-4 ">
          <Label htmlFor="status" className="font-bold">
            Status
          </Label>
          <Select
            id="status"
            name="status"
            onValueChange={setStatus}
            value={status}
          >
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
        <Button
          type="reset"
          variant="outline"
          disabled={isSubmitting}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating" : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}
