"use server";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";

// get all movies action
export const getMovies = async () => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/v1/movies`, {
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
      console.log(`A Movie Was deleted with the_id : ${result.insertedId}`);
      return {
        success: true,
        message: "Movie deleted Successfully",
      };
    } else {
      return undefined;
    }
  } catch {
    console.log("MongoDb deleted Failed");
  }
};
// get movie by iD
export const getMovieById = async (movieId) => {
  try {
    const result = await db
      .collection("movies")
      .findOne({ _id: new ObjectId(movieId) });

    console.log(result);

    if (result && Object.keys(result).length > 0) {
      console.log(`A Movie found with the_id : ${result._id}`);
      return {
        success: true,
        message: "Movie Found",
        data: result,
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("MongoDb  Failed", error);
  }
};

//get All movies with filters action
export const searchMovies = async (query) => {
  try {
    const movies = await db
      .collection("movies")
      .find({ title: { $regex: query, $options: "i" } }) // i for case insensitivity
      .limit(50)
      .toArray();
    // console.log("Search movies : ", movies, query);
    if (movies && movies.length > 0) {
      return {
        success: true,
        message: "Movies fetched Succesfully",
        data: movies,
      };
    } else {
      return {
        success: false,
        message: "No Movies F",
      };
    }
    return {
      success: true,
      message: "Movies fetched succcesfully ",
      data: movies,
    };
  } catch (error) {
    console.log("MongoDB fetch Failed", error);
    return {
      success: false,
      message: "Error Fetching movies ",
      data: [],
    };
  }
};
