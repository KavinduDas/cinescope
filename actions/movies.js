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

    if (!response.ok) {
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
