import { useRouter } from 'next/router';
import type { MouseEventHandler } from 'react';
import styles from './GoBackButton.module.scss';

interface GoBackButtonProps {
  onClick?: MouseEventHandler;
};

const GoBackButton = (props: GoBackButtonProps) => {
  const router = useRouter();

  return (
    <div className={styles['go-back-button']} onClick={(event) => props.onClick ? props.onClick(event) : router.back()}>
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width={20} height={20}>
        <path
          fill="currentColor"
          d="M353 450a15 15 0 0 1-10.61-4.39L157.5 260.71a15 15 0 0 1 0-21.21L342.39 54.6a15 15 0 1 1 21.22 21.21L189.32 250.1l174.29 174.29A15 15 0 0 1 353 450Z"
          data-name={1}
        />
      </svg>
      <span className={styles['go-back-text']}>Back</span>
    </div>
  );
};

export default GoBackButton;