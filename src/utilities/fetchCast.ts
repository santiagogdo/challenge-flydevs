import type { Cast } from "../interfaces";
import fetchFromApi from "./fetchFromApi";

export default async function fetchCast(movieId: number): Promise<Array<Cast>> {
  const response = await fetchFromApi<any>(`https://api.themoviedb.org/3/movie/${movieId}/credits`);
  return response.cast;
};