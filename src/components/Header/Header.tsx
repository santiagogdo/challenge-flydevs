import type { ChangeEventHandler, MouseEventHandler } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Header.module.scss';

interface HeaderProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  handleFavouriteMovies: MouseEventHandler<HTMLSpanElement>;
};

const Header = (props: HeaderProps) => {
  return (
    <div className={styles['header-container']}>
      <span className={styles['header-text']} onClick={props.handleFavouriteMovies}>Favourites</span>
      <div className={styles['search-wrapper']}>
        <SearchBar onChange={props.onChange} />
      </div>
    </div>
  );
}

export default Header;
