import fetchFromApi from "./fetchFromApi";

export default async function fetchMovies(page: number) {
  const response = await fetchFromApi<any>(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${page}`);
  return {
    movies: response.results,
    totalPages: response.total_pages
  };
};