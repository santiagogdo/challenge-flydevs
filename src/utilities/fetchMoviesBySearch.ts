import { config } from "../config";

export default async function fetchMoviesBySearch(searchQuery: string, page: number) {
  const response = await fetch(new Request(
    `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${page}`,
    {
      headers: {
        'Authorization': config.authToken || ''
      },
      method: 'GET',
    }));
  const parsedData = await response.json();
  return { movies: parsedData.results, totalPages: parsedData.total_pages };
};