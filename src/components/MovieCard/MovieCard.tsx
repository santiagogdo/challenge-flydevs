import Image from 'next/image';
import { useRouter } from 'next/router';
import { config } from '../../config';
import useCustomContext from '../../hooks/useCustomContext';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import PlayButton from '../PlayButton/PlayButton';
import StarRating from '../StarRating/StarRating';
import styles from './MovieCard.module.scss';

interface MovieData {
  movieId: number;
  title: string;
  releaseDate: string;
  image: string;
  genres: Array<string>;
  score: number;
}

const MovieCard = (props: MovieData) => {
  const { state, dispatch } = useCustomContext();
  const router = useRouter();

  const isSelected = () => state.includes(props.movieId);

  const handleOnClick = () => {
    const selected = isSelected();
    if (!selected) {
      dispatch({ type: 'ADD_FAVOURITE', payload: props.movieId });
    }
    else {
      dispatch({ type: 'REMOVE_FAVOURITE', payload: props.movieId });
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.poster}>
        <div className={styles['favourite-button-container']}>
          <FavouriteButton isSelected={isSelected()} onClick={handleOnClick} />
        </div>
        <div className={styles['overlay']} onClick={() => router.push(`/movies/${props.movieId}`)} >
          <div className={styles['play-button-wrapper']}>
            <PlayButton size={70} />
          </div>
        </div>
        <Image
          className={styles['poster-image']}
          src={props.image}
          alt={`Poster image of ${props.title}`}
          width={312}
          height={416}
          layout="responsive"
          placeholder='blur'
          blurDataURL={config.placeholderImage} />
      </div>
      <div className={styles['star-rating-container']}>
        <span className={styles['movie-genres']}>{props.genres.join(', ')}</span>
        <StarRating
          editable={false}
          value={props.score / 2}
          size={16}
          activeColor="#ff3365"
          inactiveColor="#85859e78"
          gap={5}
        />
      </div>
      <span className={styles['movie-title']}>{props.title}</span>
      {props.releaseDate &&
        <span className={styles['movie-duration']}>{new Date(props.releaseDate).toLocaleDateString('en-US', { year: 'numeric' })}</span>
      }
    </div>
  );
};

export default MovieCard;
