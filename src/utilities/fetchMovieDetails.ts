import type { MovieDetail } from "../interfaces";
import fetchFromApi from "./fetchFromApi";

export default async function fetchMovieDetails(movieId: number): Promise<MovieDetail> {
  return await fetchFromApi(`https://api.themoviedb.org/3/movie/${movieId}`);
};