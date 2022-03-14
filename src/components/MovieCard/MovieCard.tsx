import Image from 'next/image';
import { useRouter } from 'next/router';
import config from '../../config';
import useCustomContext from '../../hooks/useCustomContext';
import type { Movie } from '../../interfaces';
import getImageFullUrl from '../../utilities/getImageFullUrl';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import PlayButton from '../PlayButton/PlayButton';
import StarRating from '../StarRating/StarRating';
import styles from './MovieCard.module.scss';

interface MovieData {
  movie: Movie;
  genres: Array<string>;
}

const MovieCard = (props: MovieData) => {
  const { state, dispatch } = useCustomContext();
  const router = useRouter();

  const isSelected = () => state.some((movie) => movie.id === props.movie.id);

  const handleOnClick = () => {
    const selected = isSelected();
    if (!selected) {
      dispatch({ type: 'ADD_FAVOURITE', payload: props.movie });
    }
    else {
      dispatch({ type: 'REMOVE_FAVOURITE', payload: props.movie.id });
    }
  };

  return (
    <div className={styles['movie-card']}>
      <div className={styles['movie-card__poster']}>
        <div className={styles['movie-card__favourite-button-container']}>
          <FavouriteButton isSelected={isSelected()} onClick={handleOnClick} />
        </div>
        <div className={styles['movie-card__overlay']} onClick={() => router.push(`/movies/${props.movie.id}`)} >
          <div className={styles['movie-card__play-button-wrapper']}>
            <PlayButton size={70} />
          </div>
        </div>
        <Image
          className={styles['movie-card__poster-image']}
          src={getImageFullUrl(props.movie.poster_path)}
          alt={`Poster image of ${props.movie.title}`}
          width={312}
          height={416}
          layout="responsive"
          placeholder='blur'
          blurDataURL={config.placeholderImage} />
      </div>
      <div className={styles['movie-card__star-rating-container']}>
        <span className={styles['movie-card__movie-genres']}>{props.genres.join(', ')}</span>
        <StarRating
          editable={false}
          value={Math.round(props.movie.vote_average / 2)}
          size={16}
          activeColor={styles.textColorPink}
          inactiveColor={styles.borderColor}
          gap={5}
        />
      </div>
      <span className={styles['movie-card__movie-title']}>{props.movie.title}</span>
      {props.movie.release_date &&
        <span className={styles['movie-card__movie-duration']}>{new Date(props.movie.release_date).toLocaleDateString('en-US', { year: 'numeric' })}</span>
      }
    </div>
  );
};

export default MovieCard;
