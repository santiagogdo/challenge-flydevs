import type { ChangeEventHandler } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import styles from './MovieListHeader.module.scss';

interface MovieListHeaderProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const MovieListHeader = (props: MovieListHeaderProps) => {
  return (
    <div className={styles['header-container']}>
      <div className={styles['search-wrapper']}>
        <SearchBar onChange={props.onChange} />
      </div>
    </div>
  );
}

export default MovieListHeader;
