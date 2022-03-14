import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FavouriteButton from '../../../components/FavouriteButton/FavouriteButton';
import FilmographyOverview from '../../../components/FilmographyOverview/FilmographyOverview';
import GoBackButton from '../../../components/GoBackButton/GoBackButton';
import MovieCast from '../../../components/MovieCast/MovieCast';
import PlayButton from '../../../components/PlayButton/PlayButton';
import Spinner from '../../../components/Spinner/Spinner';
import StarRating from '../../../components/StarRating/StarRating';
import config from '../../../config';
import useCustomContext from '../../../hooks/useCustomContext';
import type { Cast, Movie, MovieDetail } from '../../../interfaces';
import fetchCast from '../../../utilities/fetchCast';
import fetchMovieDetails from '../../../utilities/fetchMovieDetails';
import fetchSimilarMovies from '../../../utilities/fetchSimilarMovies';
import getImageFullUrl from '../../../utilities/getImageFullUrl';
import styles from './/MovieDetails.module.scss';

const MovieDetails: NextPage = () => {
  const { state, dispatch } = useCustomContext();
  const router = useRouter();
  const [movieDetails, setMovieDetails] = useState<MovieDetail>();
  const [movieCast, setMovieCast] = useState<Array<Cast>>([]);
  const [similarMovies, setSimilarMovies] = useState<Array<Movie>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (router.query.movieId) {
      const movieId = parseInt(router.query.movieId as string);
      setIsLoading(true);
      Promise.all([
        fetchMovieDetails(movieId),
        fetchCast(movieId),
        fetchSimilarMovies(movieId, 1)]).then((results) => {
          setMovieDetails(results[0]);
          setMovieCast(results[1]);
          setSimilarMovies(results[2].movies);
        }).finally(() => setIsLoading(false));
    }
  }, [router.query]);

  const isSelected = () => state.some((movie) => movie.id === parseInt(router.query.movieId as string));

  const handleOnClick = () => {
    const selected = isSelected();
    if (movieDetails) {
      if (!selected) {
        dispatch({ type: 'ADD_FAVOURITE', payload: { ...movieDetails, genre_ids: movieDetails.genres.map((genre) => genre.id) } });
      }
      else {
        dispatch({ type: 'REMOVE_FAVOURITE', payload: movieDetails.id });
      }
    }
  };

  return (
    <div className={styles['movie-details']}>
      {isLoading ?
        <div className={styles['movie-details__spinner-container']}>
          <Spinner />
        </div>
        : <>
          {movieDetails && <>
            <div className={styles['movie-details__poster-container']}>
              <div className={styles['movie-details__go-back-button-container']}>
                <GoBackButton />
              </div>
              <div className={styles['movie-details__favourite-button-container']}>
                <FavouriteButton isSelected={isSelected()} onClick={handleOnClick} />
              </div>
              <div className={styles['movie-details__overlay']}>
                <div className={styles['movie-details__play-button-container']}>
                  <PlayButton size={70} />
                </div>
              </div>
              <div className={styles['movie-details__poster-image-container']}>
                <Image
                  src={getImageFullUrl(movieDetails.backdrop_path || movieDetails.poster_path, 'original')}
                  alt={`Poster of ${movieDetails.title}`}
                  layout="fill"
                  objectFit="cover"
                  className={styles['movie-details__poster']}
                  placeholder='blur'
                  blurDataURL={config.placeholderImage} />
              </div>
            </div>
            <div className={styles['movie-details__content']}>
              <span className={styles['movie-details__movie-title']}>{movieDetails.title}</span>
              <span className={styles['movie-details__movie-genres']}>{movieDetails.genres.map((genre) => genre.name).join(', ')}</span>
              <div className={styles['movie-details__rating-duration-container']}>
                <StarRating
                  editable={false}
                  value={Math.round(movieDetails.vote_average / 2)}
                  size={16}
                  activeColor={styles.textColorPink}
                  inactiveColor={styles.borderColor}
                  gap={7}
                />
                <span className={styles['movie-details__movie-duration']}>{`${movieDetails.runtime} MIN`}</span>
              </div>
              <div className={styles['movie-details__movie-storyline-container']}>
                <span className={styles['movie-details__movie-storyline-title']}>Storyline</span>
                <span className={styles['movie-details__movie-storyline-description']}>{movieDetails.overview}</span>
              </div>
              <MovieCast cast={movieCast} />
              <div className={styles['movie-details__movie-similar-movies-container']}>
                <span className={styles['movie-details__movie-similar-movies-title']}>Similar movies</span>
                <FilmographyOverview movies={similarMovies} />
              </div>
            </div>
          </>}
        </>
      }
    </div>
  );
}

export default MovieDetails;