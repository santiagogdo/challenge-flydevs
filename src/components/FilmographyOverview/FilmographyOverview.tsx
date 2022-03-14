import { Carousel } from '@trendyol-js/react-carousel';
import { useMediaQuery, useWindowSize } from 'usehooks-ts';
import { Movie } from '../../interfaces';
import FilmographyOverviewCard from '../FilmographyOverviewCard/FilmographyOverviewCard';
import styles from './FilmographyOverview.module.scss';

interface FilmographyOverviewProps {
  movies: Array<Movie>;
}

const leftArrow = (flipArrow?: boolean) => {
  return (
    <div className={`${styles['arrow-button-container']} ${flipArrow && styles['arrow-button-container--flip-arrow'] || ''}`}>
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width={30} height={30}>
        <path
          transform={flipArrow && 'scale (-1, 1)' || ''} transform-origin={flipArrow && 'center' || ''}
          fill={styles.textColorWhite}
          d="M353 450a15 15 0 0 1-10.61-4.39L157.5 260.71a15 15 0 0 1 0-21.21L342.39 54.6a15 15 0 1 1 21.22 21.21L189.32 250.1l174.29 174.29A15 15 0 0 1 353 450Z"
          data-name={1}
        />
      </svg>
    </div>
  );
};

const FilmographyOverview = (props: FilmographyOverviewProps) => {
  const isSmallViewport = useMediaQuery('(max-width: 880px)');
  const windowSize = useWindowSize();

  const getCardCount = () => Math.floor(windowSize.width / 250);

  return (
    <Carousel
      className={styles['carousel']}
      show={getCardCount()}
      slide={isSmallViewport ? 1 : 3}
      dynamic
      swiping={true}
      swipeOn={0.2}
      leftArrow={leftArrow()}
      rightArrow={leftArrow(true)}
      infinite={false}>
      {
        props.movies.map((movie, index) => {
          return (
            <div className={styles['filmography-card-container']} key={movie.id + index}>
              <FilmographyOverviewCard movie={movie} />
            </div>
          )
        })
      }
    </Carousel>
  );
};

export default FilmographyOverview;