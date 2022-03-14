import Image from 'next/image';
import { useRouter } from 'next/router';
import config from '../../config';
import { Movie } from '../../interfaces';
import getImageFullUrl from '../../utilities/getImageFullUrl';
import PlayButton from '../PlayButton/PlayButton';
import styles from './FilmographyOverviewCard.module.scss';

interface FilmographyOverviewProps {
  movie: Movie;
}

const FilmographyOverviewCard = (props: FilmographyOverviewProps) => {
  const router = useRouter();

  return (
    <div className={styles['filmography-overview-card']}>
      <div className={styles['filmography-overview-card__poster']}>
        <div className={styles['filmography-overview-card__overlay']} onClick={() => router.push(`/movies/${props.movie.id}`)} >
          <div className={styles['filmography-overview-card__play-button-wrapper']}>
            <PlayButton size={70} />
          </div>
        </div>
        <Image
          className={styles['filmography-overview-card__poster-image']}
          src={getImageFullUrl(props.movie.poster_path)}
          alt={`Poster image of ${props.movie.title}`}
          width={312}
          height={416}
          layout="responsive"
          placeholder='blur'
          blurDataURL={config.placeholderImage}
          draggable={false}
          onDragStart={(event) => event.preventDefault()} />
      </div>
      <span className={styles['filmography-overview-card__movie-title']}>{props.movie.title}</span>
      {props.movie.release_date &&
        <span className={styles['filmography-overview-card__movie-release-date']}>{new Date(props.movie.release_date).toLocaleDateString('en-US', { year: 'numeric' })}</span>
      }
    </div>
  );
};

export default FilmographyOverviewCard;