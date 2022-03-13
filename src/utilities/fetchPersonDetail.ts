import type { Cast } from "../interfaces";
import fetchFromApi from "./fetchFromApi";

export default async function fetchPersonDetail(personId: number): Promise<Cast> {
  return await fetchFromApi(`https://api.themoviedb.org/3/person/${personId}`);
};