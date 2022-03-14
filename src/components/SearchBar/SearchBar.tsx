import styles from './SearchBar.module.scss';
import Image from 'next/image';
import type { ChangeEventHandler } from 'react';

interface SearchBarProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const SearchBar = (props: SearchBarProps) => {
  return (
    <div className={styles['search-bar']}>
      <div className={styles['search-bar__icon']}>
        <Image src="/search-icon.svg" alt="Search icon" width={20} height={20} />
      </div>
      <input type="text" className={styles['search-bar__input']} onChange={props.onChange} />
    </div>
  );
}

export default SearchBar;
