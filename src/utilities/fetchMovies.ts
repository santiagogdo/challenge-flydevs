import { config } from "../config";

export async function fetchMovies(page: number) {
  const response = await fetch(new Request(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${page}`,
    {
      headers: {
        'Authorization': config.authToken || ''
      },
      method: 'GET',
    }));
  const parsedData = await response.json();
  return { movies: parsedData.results, totalPages: parsedData.total_pages };
};