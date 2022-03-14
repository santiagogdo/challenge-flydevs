import type { NextPage } from 'next';
import { type ChangeEvent, type UIEvent, useEffect, useState, useRef } from 'react';
import useFetchGenres from '../../hooks/useFetchGenres';
import type { Movie } from '../../interfaces';
import MovieCard from '../../components/MovieCard/MovieCard';
import Spinner from '../../components/Spinner/Spinner';
import Header from '../../components/Header/Header';
import fetchMovies from '../../utilities/fetchMovies';
import fetchMoviesBySearch from '../../utilities/fetchMoviesBySearch';
import styles from './MovieList.module.scss';
import FavouriteMoviesModal from '../../components/FavouriteMoviesModal/FavouriteMoviesModal';

const MovieList: NextPage = () => {
  const { genres } = useFetchGenres();
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [movieSearchResult, setMovieSearchResult] = useState<Array<Movie>>([]);
  const [search, setSearch] = useState<string>('');
  const [pageNum, setPageNum] = useState(1);
  const [searchPageNum, setSearchPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (search) {
      setIsLoading(true);
      fetchMoviesBySearch(search, searchPageNum).then((data) => {
        setIsLoading(false);
        setMovieSearchResult((previousState) => [...previousState, ...data.movies]);
        setMovies([]);
        setPageNum(1);
        setTotalPages(data.totalPages);
      });
    }
  }, [search, searchPageNum]);

  useEffect(() => {
    if (!search) {
      setIsLoading(true);
      fetchMovies(pageNum).then((data) => {
        setIsLoading(false);
        setMovies((previousState) => [...previousState, ...data.movies]);
        setMovieSearchResult([]);
        setSearchPageNum(1);
        setTotalPages(data.totalPages);
      });
    }
  }, [pageNum, search]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => setSearch(event.target.value), 500);
  };

  // Implements infinite scroll so that more movies are loaded when user scrolls to the bottom of the movie list 
  const handleOnScroll = (event: UIEvent<HTMLDivElement>) => {
    if (!event) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = event.target as HTMLElement;
    const bottom = scrollTop + clientHeight + 10 > scrollHeight;
    if (bottom && !isLoading) {
      if (search) {
        setSearchPageNum((previousPageNumber) => searchPageNum < totalPages && previousPageNumber + 1 || previousPageNumber);
        setPageNum(1);
      } else {
        setPageNum((previousPageNumber) => pageNum < totalPages && previousPageNumber + 1 || previousPageNumber);
        setSearchPageNum(1);
      }
    }
  };

  const toggleFavouriteMoviesModal = () => {
    setIsModalOpen((previous) => !previous);
  };

  const getMovieGenres = (movie: Movie) => {
    return genres.filter((genre) => movie.genre_ids.includes(genre.id)).map((genre) => genre.name);
  };

  return (
    <div className={styles['movie-list']}>
      <FavouriteMoviesModal isOpen={isModalOpen} onClose={toggleFavouriteMoviesModal} genres={genres} />
      <Header onChange={handleOnChange} handleFavouriteMovies={toggleFavouriteMoviesModal} />
      {isLoading && (!search && pageNum < 2 || search && searchPageNum < 2) ?
        <div className={styles['movie-list__spinner-container']}>
          <Spinner />
        </div>
        :
        <>
          <div onScroll={handleOnScroll} className={`${styles['movie-list__container']} ${isLoading ? styles['movie-list__loading-more'] : ''}`}>
            {(search && movieSearchResult || movies).map((movie, index) => {
              return (
                <MovieCard
                  key={movie.id + index}
                  movie={movie}
                  genres={getMovieGenres(movie)}
                />
              )
            })}
          </div>
          {isLoading &&
            <div className={styles['movie-list__loading-more-spinner']}>
              <Spinner />
            </div>
          }
        </>
      }
    </div>
  );
};

export default MovieList;