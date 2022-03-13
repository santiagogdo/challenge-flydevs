import Image from "next/image";
import GoBackButton from "../GoBackButton/GoBackButton";
import styles from './ErrorComponent.module.scss';

interface ErrorComponentProps {
  errorMessage: string;
};

const ErrorComponent = (props: ErrorComponentProps) => {
  return (
    <div className={styles['nothing-to-show-container']}>
      <div className={styles['go-back-button-wrapper']}>
        <GoBackButton />
      </div>
      <span className={styles['error-description']}>{props.errorMessage}</span>
      <div className={styles['image-wrapper']}>
        <Image
          src="/nothing-to-show.svg"
          alt="Nothing to show"
          width={300}
          height={300}
          layout="responsive" />
      </div>
    </div>
  );
};

export default ErrorComponent;