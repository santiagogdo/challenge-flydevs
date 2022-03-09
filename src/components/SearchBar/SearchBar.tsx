import styles from './SearchBar.module.scss';
import Image from 'next/image';

interface SearchBarProps {
  setSearch: (value: string) => void;
};

const SearchBar = (props: SearchBarProps) => {
  return (
    <div className={styles['search-container']}>
      <div className={styles['search-wrapper']}>
        <div className={styles.icon}>
          <Image src="/search-icon.svg" alt="Search icon" width={20} height={20} />
        </div>
        <input type="text" className={styles.search} onChange={(event) => props.setSearch(event.currentTarget.value)} />
      </div>
    </div>
  );
}

export default SearchBar;
