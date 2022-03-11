import { config } from "../config";
import type { MovieDetail } from "../interfaces";

export default async function fetchMovies(movieId: number): Promise<MovieDetail> {
  const response = await fetch(new Request(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      headers: {
        'Authorization': config.authToken || ''
      },
      method: 'GET',
    }));
  const parsedData = await response.json();
  return parsedData;
};