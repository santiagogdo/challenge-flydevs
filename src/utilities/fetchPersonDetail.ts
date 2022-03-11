import { config } from "../config";
import { Cast } from "../interfaces";

export default async function fetchPersonDetail(personId: number): Promise<Cast> {
  const response = await fetch(new Request(
    `https://api.themoviedb.org/3/person/${personId}`,
    {
      headers: {
        'Authorization': config.authToken || ''
      },
      method: 'GET',
    }));
  const parsedData = await response.json();
  return parsedData;
};