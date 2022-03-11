import { useRouter } from 'next/router';
import { createRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import type { Cast } from '../../interfaces';
import styles from './MovieCast.module.scss';
import CastPersonOverview from '../CastPersonOverview/CastPersonOverview';

interface MovieCastProps {
  cast: Array<Cast>;
}

const MovieCast = (props: MovieCastProps) => {
  const router = useRouter();
  const [seeMore, setSeeMore] = useState<boolean>(false);

  const filteredCast = (cast: Array<Cast>) => {
    if (seeMore) {
      return cast.slice(0, 8);
    }

    return cast.slice(0, 4);
  }

  return <div className={styles['movie-cast-container']}>
    <div className={styles['movie-cast-title-container']}>
      <span className={styles['movie-cast-title']}>Cast</span>
      <a className={styles['movie-cast-see-more']} onClick={() => setSeeMore(!seeMore)}>{seeMore ? 'See less' : 'See more'}</a>
    </div>
    {
      <TransitionGroup appear exit className={styles['movie-person-overview-container']}>
        {filteredCast(props.cast).map((person) => {
          const itemRef = createRef();
          return <CSSTransition
            nodeRef={itemRef as any}
            key={person.id}
            timeout={300}
            unmountOnExit
            classNames={{
              appearActive: styles['item-appear-active'],
              enterActive: styles['item-enter-active'],
              exitActive: styles['item-exit-active'],
              exitDone: styles['item-exit-done']
            }}
          >
            <div ref={itemRef as any}>
              <CastPersonOverview
                imageSrc={`${process.env.NEXT_PUBLIC_MOVIE_IMAGE_BASE_URL}original${person.profile_path}`}
                name={person.name}
                onClick={() => router.push(`${router.asPath}/cast/${person.id}`)} />
            </div>
          </CSSTransition>
        })}
      </TransitionGroup>
    }
  </div>
};

export default MovieCast;