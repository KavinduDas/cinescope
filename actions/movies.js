"use server";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";

export const getMovies = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/movie", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const text = await response.text(); // get raw error body
      console.error("Error body:", text);
      throw new Error("Network response is not okay");
    }
    if (response.status === 200) {
      return await response.json();
    } else {
      console.log("No movies found");
      return undefined;
    }
  } catch (error) {
    console.log("Error Fetching Movies", error);
    return undefined;
  }
};
// Create Movie Form

export const createMovie = async (movie) => {
  try {
    const result = await db.collection("moviesNew").insertOne(movie);

    if (result.acknowledged) {
      console.log(`A Movie Was inserted with the_id : ${result.insertedId}`);
      return {
        success: true,
        message: "Movie Created Successfully",
      };
    } else {
      return undefined;
    }
  } catch {
    console.log("MongoDb insert Failed");
  }
};

// update movie form

export const updateMovie = async (movieId, movieDoc) => {
  try {
    const result = await db
      .collection("movies")
      .updateOne(
        { _id: new ObjectId.createFromHexString(movieId) },
        { $set: movieDoc },
        { upsert: true }
      );

    if (result.acknowledged) {
      console.log(`A Movie Was inserted with the_id : ${result.insertedId}`);
      return {
        success: true,
        message: "Movie Updated Successfully",
      };
    } else {
      return undefined;
    }
  } catch {
    console.log("MongoDb Updated Failed");
  }
};

// Delete Movie Action

export const deleteMovie = async (movieId, movieDoc) => {
  try {
    const result = await db
      .collection("movies")
      .deleteOne({ _id: new ObjectId.createFromHexString(movieId) });

    if (result.acknowledged) {
      console.log(`A Movie Was inserted with the_id : ${result.insertedId}`);
      return {
        success: true,
        message: "Movie Updated Successfully",
      };
    } else {
      return undefined;
    }
  } catch {
    console.log("MongoDb Updated Failed");
  }
};
