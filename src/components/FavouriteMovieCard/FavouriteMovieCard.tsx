import Image from 'next/image';
import { useRouter } from 'next/router';
import config from '../../config';
import useCustomContext from '../../hooks/useCustomContext';
import type { Movie } from '../../interfaces';
import getImageFullUrl from '../../utilities/getImageFullUrl';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import PlayButton from '../PlayButton/PlayButton';
import StarRating from '../StarRating/StarRating';
import styles from './FavouriteMovieCard.module.scss';

interface FavouriteMovieCardProps {
  movie: Movie;
  genres: Array<string>;
};

const FavouriteMovieCard = (props: FavouriteMovieCardProps) => {
  const { state, dispatch } = useCustomContext();
  const router = useRouter();

  const isSelected = () => state.some((movie) => movie.id === props.movie.id);

  const handleOnClick = () => {
    const selected = isSelected();
    if (selected) {
      dispatch({ type: 'REMOVE_FAVOURITE', payload: props.movie.id });
    }
  };

  return (
    <div className={styles['favourite-movie-card']}>
      <div className={styles['favourite-movie-card__poster']}>
        <div className={styles['favourite-movie-card__button-container']}>
          <FavouriteButton isSelected={isSelected()} onClick={handleOnClick} />
        </div>
        <div className={styles['favourite-movie-card__overlay-container']}>
          <div className={styles['favourite-movie-card__overlay']} onClick={() => router.push(`/movies/${props.movie.id}`)} >
            <div className={styles['favourite-movie-card__play-button-container']}>
              <PlayButton size={70} />
            </div>
          </div>
        </div>
        <Image
          className={styles['favourite-movie-card__poster-image']}
          src={getImageFullUrl(props.movie.poster_path)}
          alt={`Poster image of ${props.movie.title}`}
          width={312}
          height={416}
          layout="responsive"
          placeholder='blur'
          blurDataURL={config.placeholderImage} />
        <div className={styles['favourite-movie-card__star-rating-container']}>
          <span className={styles['favourite-movie-card__movie-genres']}>{props.genres.join(', ')}</span>
          <StarRating
            editable={false}
            value={Math.round(props.movie.vote_average / 2)}
            size={16}
            activeColor={styles.textColorPink}
            inactiveColor={styles.borderColor}
            gap={5}
          />
        </div>
      </div>
      <div className={styles['favourite-movie-card__info-container']}>
        <span className={styles['favourite-movie-card__movie-title']}>{props.movie.title}</span>
        {props.movie.release_date &&
          <span className={styles['favourite-movie-card__movie-duration']}>{new Date(props.movie.release_date).toLocaleDateString('en-US', { year: 'numeric' })}</span>
        }
        <span className={styles['favourite-movie-card__movie-description']}>{props.movie.overview}</span>
      </div>
    </div>
  );
};

export default FavouriteMovieCard;
