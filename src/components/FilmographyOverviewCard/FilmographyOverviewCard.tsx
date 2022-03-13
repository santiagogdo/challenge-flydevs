import Image from 'next/image';
import { useRouter } from 'next/router';
import { config } from '../../config';
import { Movie } from '../../interfaces';
import PlayButton from '../PlayButton/PlayButton';
import styles from './FilmographyOverviewCard.module.scss';

interface FilmographyOverviewProps {
  movie: Movie;
}

const FilmographyOverviewCard = (props: FilmographyOverviewProps) => {
  const router = useRouter();

  return (
    <div className={styles.card}>
      <div className={styles.poster}>
        <div className={styles['overlay']} onClick={() => router.push(`/movies/${props.movie.id}`)} >
          <div className={styles['play-button-wrapper']}>
            <PlayButton size={70} />
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
          blurDataURL={config.placeholderImage}
          draggable={false}
          onDragStart={(event) => event.preventDefault()}/>
      </div>
      <span className={styles['movie-title']}>{props.movie.title}</span>
      {props.movie.release_date &&
        <span className={styles['movie-release-date']}>{new Date(props.movie.release_date).toLocaleDateString('en-US', { year: 'numeric' })}</span>
      }
    </div>
  );
};

export default FilmographyOverviewCard;