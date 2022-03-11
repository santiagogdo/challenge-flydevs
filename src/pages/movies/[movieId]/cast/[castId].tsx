import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Image from 'next/image';
import styles from './CastDetails.module.scss';
import Spinner from '../../../../components/Spinner/Spinner';
import CastPersonOverview from '../../../../components/CastPersonOverview/CastPersonOverview';
import { useEffect, useState } from 'react';
import fetchPersonDetail from '../../../../utilities/fetchPersonDetail';
import type { Cast } from '../../../../interfaces';
import { config } from '../../../../config';

const CastDetails: NextPage = () => {
  const router = useRouter();
  const [personDetail, setPersonDetail] = useState<Cast>();
  const [isLoading, setIsLoading] = useState(false);

  const getMovieId = () => parseInt(router.query.movieId as string);

  useEffect(() => {
    if (router.query.castId && typeof router.query.castId === 'string') {
      setIsLoading(true);
      fetchPersonDetail(parseInt(router.query.castId)).then((data) => {
        setPersonDetail(data);
        setIsLoading(false);
      });
    }
  }, [router.query.castId]);

  return (
    <div className={styles.container}>
      {isLoading ?
        <Spinner />
        : <>
          {personDetail && <>
            <div className={styles['poster-container']}>
              <div className={styles['go-back-button']} onClick={() => router.push(`/movies/${getMovieId()}`)}>
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width={20} height={20}>
                  <path
                    fill="currentColor"
                    d="M353 450a15 15 0 0 1-10.61-4.39L157.5 260.71a15 15 0 0 1 0-21.21L342.39 54.6a15 15 0 1 1 21.22 21.21L189.32 250.1l174.29 174.29A15 15 0 0 1 353 450Z"
                    data-name={1}
                  />
                </svg>
                <span className={styles['go-back-text']}>Back</span>
              </div>
              <div className={styles['overlay']}>
              </div>
              <div className={styles['poster-image-container']}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_MOVIE_IMAGE_BASE_URL}original${personDetail.profile_path}`}
                  alt={`Poster of ${personDetail.name}`}
                  layout="fill"
                  objectFit="cover"
                  className={styles.poster}
                  placeholder='blur'
                  blurDataURL={config.placeholderImage} />
              </div>
            </div>
            <span className={styles['cast-name']}>{personDetail.name}</span>
            <div className={styles['cast-personal-info-container']}>
              <CastPersonOverview imageSrc={`${process.env.NEXT_PUBLIC_MOVIE_IMAGE_BASE_URL}original${personDetail.profile_path}`} />
              <div className={styles['cast-personal-info']}>
                {personDetail.birthday && <span className={styles['cast-birth-date']}>{new Date(personDetail.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>}
                {personDetail.place_of_birth && <span className={styles['cast-place-of-birth']}>{personDetail.place_of_birth}</span>}
                <span className={styles['cast-occupation']}>{personDetail.known_for_department}</span>
              </div>
            </div>
            <div className={styles['content-container']}>
              <div className={styles['cast-biography-container']}>
                <span className={styles['cast-biography-title']}>Biography</span>
                <span className={styles['cast-biography-description']}>{personDetail.biography}</span>
              </div>
            </div>
          </>}
        </>
      }
    </div>
  );
}

export default CastDetails;