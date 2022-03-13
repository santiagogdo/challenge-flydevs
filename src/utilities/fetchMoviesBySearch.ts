import fetchFromApi from "./fetchFromApi";

export default async function fetchMoviesBySearch(searchQuery: string, page: number) {
  const response = await fetchFromApi<any>(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${page}`);
  return {
    movies: response.results,
    totalPages: response.total_pages
  };
};