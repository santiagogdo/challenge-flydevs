import fetchFromApi from "./fetchFromApi";

export default async function fetchActorFilmography(externalId: string) {
  const response = await fetchFromApi<any>(`https://api.themoviedb.org/3/find/${externalId}?external_source=imdb_id`);
  return response.person_results[0].known_for;
};