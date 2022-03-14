import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Image from 'next/image';
import styles from './CastDetails.module.scss';
import Spinner from '../../../../components/Spinner/Spinner';
import CastPersonOverview from '../../../../components/CastPersonOverview/CastPersonOverview';
import { useEffect, useState } from 'react';
import fetchPersonDetail from '../../../../utilities/fetchPersonDetail';
import type { Cast, Movie } from '../../../../interfaces';
import config from '../../../../config';
import FilmographyOverview from '../../../../components/FilmographyOverview/FilmographyOverview';
import fetchActorFilmography from '../../../../utilities/fetchActorFilmography';
import getImageFullUrl from '../../../../utilities/getImageFullUrl';
import GoBackButton from '../../../../components/GoBackButton/GoBackButton';

const CastDetails: NextPage = () => {
  const router = useRouter();
  const [personDetail, setPersonDetail] = useState<Cast>();
  const [filmography, setFilmography] = useState<Array<Movie>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMovieId = () => parseInt(router.query.movieId as string);

  useEffect(() => {
    if (router.query.castId && typeof router.query.castId === 'string') {
      setIsLoading(true);
      fetchPersonDetail(parseInt(router.query.castId)).then((data) => {
        fetchActorFilmography(data.imdb_id).then((result) => {
          setFilmography(result);
          setIsLoading(false);
        });
        setPersonDetail(data);
      });
    }
  }, [router.query.castId]);

  return (
    <div className={styles['cast-details']}>
      {isLoading ?
        <div className={styles['cast-details__spinner-container']}>
          <Spinner />
        </div>
        : <>
          {personDetail && <>
            <div className={styles['cast-details__poster-container']}>
              <div className={styles['cast-details__go-back-button-container']}>
                <GoBackButton />
              </div>
              <div className={styles['cast-details__overlay']}>
              </div>
              <div className={styles['cast-details__poster-image-container']}>
                <Image
                  src={getImageFullUrl(personDetail.profile_path, 'original')}
                  alt={`Poster of ${personDetail.name}`}
                  layout="fill"
                  objectFit="cover"
                  className={styles['cast-details__poster']}
                  placeholder='blur'
                  blurDataURL={config.placeholderImage} />
              </div>
            </div>
            <span className={styles['cast-details__name']}>{personDetail.name}</span>
            <div className={styles['cast-details__personal-info-container']}>
              <CastPersonOverview imageSrc={getImageFullUrl(personDetail.profile_path, 'original')} />
              <div className={styles['cast-details__personal-info']}>
                {personDetail.birthday && <span className={styles['cast-details__birth-date']}>{new Date(personDetail.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>}
                {personDetail.place_of_birth && <span className={styles['cast-details__place-of-birth']}>{personDetail.place_of_birth}</span>}
                <span className={styles['cast-details__occupation']}>{personDetail.known_for_department}</span>
              </div>
            </div>
            <div className={styles['cast-details__content-container']}>
              <div className={styles['cast-details__biography-container']}>
                <span className={styles['cast-details__biography-title']}>Biography</span>
                <span className={styles['cast-details__biography-description']}>{personDetail.biography || 'No biography available.'}</span>
              </div>
              <div className={styles['cast-details__filmography-container']}>
                <span className={styles['cast-details__filmography-title']}>Filmography</span>
                {filmography && <FilmographyOverview movies={filmography} />}
              </div>
            </div>
          </>}
        </>
      }
    </div>
  );
}

export default CastDetails;