import Image from 'next/image';
import { useRouter } from 'next/router';
import { config } from '../../config';
import useCustomContext from '../../hooks/useCustomContext';
import type { Movie } from '../../interfaces';
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
    <div className={styles.card}>
      <div className={styles.poster}>
        <div className={styles['favourite-button-container']}>
          <FavouriteButton isSelected={isSelected()} onClick={handleOnClick} />
        </div>
        <div className={styles['overlay-wrapper']}>
          <div className={styles['overlay']} onClick={() => router.push(`/movies/${props.movie.id}`)} >
            <div className={styles['play-button-wrapper']}>
              <PlayButton size={70} />
            </div>
          </div>
        </div>
        <Image
          className={styles['poster-image']}
          src={props.movie.poster_path ? `${config.movieImageBaseUrl}w500${props.movie.poster_path}` : config.placeholderImage || ''}
          alt={`Poster image of ${props.movie.title}`}
          width={312}
          height={416}
          layout="responsive"
          placeholder='blur'
          blurDataURL={config.placeholderImage} />
        <div className={styles['star-rating-container']}>
          <span className={styles['movie-genres']}>{props.genres.join(', ')}</span>
          <StarRating
            editable={false}
            value={Math.round(props.movie.vote_average / 2)}
            size={16}
            activeColor="#ff3365"
            inactiveColor="#85859e78"
            gap={5}
          />
        </div>
      </div>
      <div className={styles['movie-content-container']}>
        <span className={styles['movie-title']}>{props.movie.title}</span>
        {props.movie.release_date &&
          <span className={styles['movie-duration']}>{new Date(props.movie.release_date).toLocaleDateString('en-US', { year: 'numeric' })}</span>
        }
        <span className={styles['movie-description']}>{props.movie.overview}</span>
      </div>
    </div>
  );
};

export default FavouriteMovieCard;
