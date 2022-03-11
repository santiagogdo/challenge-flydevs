import { config } from "../config";
import { Cast } from "../interfaces";

export default async function fetchCast(movieId: number): Promise<Array<Cast>> {
  const response = await fetch(new Request(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    {
      headers: {
        'Authorization': config.authToken || ''
      },
      method: 'GET',
    }));
  const parsedData = await response.json();
  return parsedData.cast;
};