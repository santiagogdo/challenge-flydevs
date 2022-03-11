import type { MouseEventHandler } from 'react';
import styles from './FavouriteButton.module.scss';

interface FavouriteButtonProps {
  isSelected?: boolean;
  onClick: MouseEventHandler;
  height?: number;
  width?: number;
};

const FavouriteButton = (props: FavouriteButtonProps) => {
  return (
    <svg onClick={props.onClick} className={`${styles.heart} ${props.isSelected ? styles.selected : ''}`}
      style={{
        height: props.height || 30,
        width: props.width || 30,
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      xmlSpace="preserve"
    >
      <path fill="currentColor" d="M20.455 4C17 4 15 7 15 7v17l1.204 1.597C19.579 22.951 27 16.886 27 10.545 27 6.93 24.07 4 20.455 4zM9.545 4C13 4 15 7 15 7v17l-1.204 1.597C10.421 22.951 3 16.886 3 10.545 3 6.93 5.93 4 9.545 4z" />
      <circle fill="currentColor" cx="15" cy="24" r="2" />
    </svg>
  );
};


export default FavouriteButton;