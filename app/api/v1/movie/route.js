// import { MOVIES } from "@/lib/data";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    // const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key =YOUR_API_KEY&language=en-US&page=1');

    const movies = await db.collection("movies").find({}).limit(50).toArray();

    return NextResponse.json(movies);
  } catch (error) {
    console.log("error fetching movies", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
export const POST = async () => {
  return NextResponse.json({ message: "Movie updated" }, { status: 200 });
};
