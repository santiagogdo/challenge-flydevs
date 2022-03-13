import fetchFromApi from "./fetchFromApi";

export default async function fetchSimilarMovies(movieId: number, page: number) {
  const response = await fetchFromApi<any>(`https://api.themoviedb.org/3/movie/${movieId}/similar?page=${page}`);
  return {
    movies: response.results,
    totalPages: response.total_pages
  };
};