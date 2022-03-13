import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FavouriteButton from '../../../components/FavouriteButton/FavouriteButton';
import MovieCast from '../../../components/MovieCast/MovieCast';
import PlayButton from '../../../components/PlayButton/PlayButton';
import Spinner from '../../../components/Spinner/Spinner';
import StarRating from '../../../components/StarRating/StarRating';
import { config } from '../../../config';
import useCustomContext from '../../../hooks/useCustomContext';
import type { Cast, MovieDetail } from '../../../interfaces';
import fetchCast from '../../../utilities/fetchCast';
import fetchMovieDetails from '../../../utilities/fetchMovieDetails';
import styles from './/MovieDetails.module.scss';

const MovieDetails: NextPage = () => {
  const { state, dispatch } = useCustomContext();
  const router = useRouter();
  const [movieDetails, setMovieDetails] = useState<MovieDetail>();
  const [movieCast, setMovieCast] = useState<Array<Cast>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (router.query.movieId) {
      setIsLoading(true);
      fetchMovieDetails(parseInt(router.query.movieId as string)).then((data) => {
        setMovieDetails(data);
      });
      fetchCast(parseInt(router.query.movieId as string)).then((data) => {
        setMovieCast(data);
        setIsLoading(false);
      });
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
    <div className={styles.container}>
      {isLoading ?
        <div className={styles['spinner-wrapper']}>
          <Spinner />
        </div>
        : <>
          {movieDetails && <>
            <div className={styles['poster-container']}>
              <div className={styles['go-back-button']} onClick={() => router.push('/movies')}>
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width={20} height={20}>
                  <path
                    fill="currentColor"
                    d="M353 450a15 15 0 0 1-10.61-4.39L157.5 260.71a15 15 0 0 1 0-21.21L342.39 54.6a15 15 0 1 1 21.22 21.21L189.32 250.1l174.29 174.29A15 15 0 0 1 353 450Z"
                    data-name={1}
                  />
                </svg>
                <span className={styles['go-back-text']}>Back</span>
              </div>
              <div className={styles['favourite-button-container']}>
                <FavouriteButton isSelected={isSelected()} onClick={handleOnClick} />
              </div>
              <div className={styles['overlay']}>
                <div className={styles['play-button-wrapper']}>
                  <PlayButton size={70} />
                </div>
              </div>
              <div className={styles['poster-image-container']}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_MOVIE_IMAGE_BASE_URL}original${movieDetails.backdrop_path || movieDetails.poster_path}`}
                  alt={`Poster of ${movieDetails.title}`}
                  layout="fill"
                  objectFit="cover"
                  className={styles.poster}
                  placeholder='blur'
                  blurDataURL={config.placeholderImage} />
              </div>
            </div>
            <div className={styles['content-container']}>
              <span className={styles['movie-title']}>{movieDetails.title}</span>
              <span className={styles['movie-genres']}>{movieDetails.genres.map((genre) => genre.name).join(', ')}</span>
              <div className={styles['rating-duration-container']}>
                <StarRating
                  editable={false}
                  value={Math.round(movieDetails.vote_average / 2)}
                  size={16}
                  activeColor={styles.textColorPink}
                  inactiveColor={styles.borderColor}
                  gap={7}
                />
                <span className={styles['movie-duration']}>{`${movieDetails.runtime} MIN`}</span>
              </div>
              <div className={styles['movie-storyline-container']}>
                <span className={styles['movie-storyline-title']}>Storyline</span>
                <span className={styles['movie-storyline-description']}>{movieDetails.overview}</span>
              </div>
              <MovieCast cast={movieCast} />
            </div>
          </>}
        </>
      }
    </div>
  );
}

export default MovieDetails;