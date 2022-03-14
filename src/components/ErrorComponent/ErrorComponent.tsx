import Image from "next/image";
import type { MouseEventHandler } from "react";
import GoBackButton from "../GoBackButton/GoBackButton";
import styles from './ErrorComponent.module.scss';


interface ErrorComponentProps {
  errorMessage: string;
  onGoBack?: MouseEventHandler;
};

const ErrorComponent = (props: ErrorComponentProps) => {
  return (
    <div className={styles['error-page']}>
      <div className={styles['error-page__go-back-button-container']}>
        <GoBackButton onClick={(event) => props.onGoBack && props.onGoBack(event)} />
      </div>
      <div className={styles['error-page__content-container']}>
        <span className={styles['error-page__error-description']}>{props.errorMessage}</span>
        <div className={styles['error-page__image-wrapper']}>
          <Image
            src="/nothing-to-show.svg"
            alt="Nothing to show"
            width={300}
            height={300}
            layout="responsive" />
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;