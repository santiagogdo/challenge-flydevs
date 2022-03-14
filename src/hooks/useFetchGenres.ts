import { useState, useEffect, } from 'react';
import type { Genre } from '../interfaces';
import config from '../config';


export default function useFetchGenres() {
  const [genres, setGenres] = useState<Array<Genre>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      const response = await fetch(new Request(
        'https://api.themoviedb.org/3/genre/movie/list',
        {
          headers: {
            'Authorization': config.authToken || ''
          },
          method: 'GET',
        }));
      const parsedData = await response.json();
      setGenres(parsedData.genres);
    };

    fetchGenres().then(() => setIsLoading(false));
  }, []);

  return { genres, isLoading };
};