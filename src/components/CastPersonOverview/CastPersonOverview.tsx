import Image from 'next/image';
import config from '../../config';
import styles from './CastPersonOverview.module.scss';

interface CastPersonOverviewProps {
  imageSrc: string;
  name?: string;
  onClick?: () => any;
}

const CastPersonOverview = (props: CastPersonOverviewProps) => {
  return (
    <div className={styles['cast-person-overview']}>
      <div className={props.onClick ? styles['cast-person-overview__image-container'] : ''} onClick={props.onClick}>
        <Image
          src={props.imageSrc}
          alt={`Photo of ${props.name}`}
          width={100}
          height={100}
          objectFit="cover"
          className={styles['cast-person-overview__image']}
          placeholder='blur'
          blurDataURL={config.placeholderImage} />
      </div>
      {props.name && <span className={styles['cast-person-overview__name']}>{props.name}</span>}
    </div>)
};

export default CastPersonOverview;