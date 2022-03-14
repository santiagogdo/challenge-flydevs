import Image from 'next/image';
import type { MouseEventHandler } from 'react';
import config from '../../config';
import useCustomContext from '../../hooks/useCustomContext';
import type { Genre, Movie } from '../../interfaces';
import FavouriteMovieCard from '../FavouriteMovieCard/FavouriteMovieCard';
import Modal from '../Modal/Modal';
import styles from './FavouriteMoviesModal.module.scss';

interface FavouriteMoviesModalProps {
  isOpen: boolean;
  onClose: MouseEventHandler<HTMLImageElement>;
  genres: Array<Genre>;
};

const FavouriteMoviesModal = (props: FavouriteMoviesModalProps) => {
  const { state } = useCustomContext();

  const getMovieGenres = (movie: Movie) => {
    return props.genres.length > 0 && props.genres.filter((genre) => movie.genre_ids.includes(genre.id)).map((genre) => genre.name) || [];
  };

  return (
    <Modal
      isOpen={props.isOpen}
      header="Favourite movies"
      onClose={props.onClose}
    >
      <div className={styles['favourite-movies-modal']}>
        {state.length > 0 &&
          state.map((movie, index) => {
            return (
              <div key={movie.id + index} className={styles['favourite-movies-modal__card-container']}>
                <FavouriteMovieCard
                  movie={movie}
                  genres={getMovieGenres(movie)}
                />
              </div>
            )
          }) ||
          <>
            <div className={styles['favourite-movies-modal__nothing-to-show-container']}>
              <span>You haven&apos;t added any movies to your favourites yet.</span>
              <div className={styles['favourite-movies-modal__image-wrapper']}>
                <Image
                  src="/nothing-to-show.svg"
                  alt="Nothing to show"
                  width={312}
                  height={416}
                  layout="responsive"
                  placeholder='blur'
                  blurDataURL={config.placeholderImage} />
              </div>
            </div>
          </>
        }
      </div>
    </Modal >
  );
}

export default FavouriteMoviesModal;