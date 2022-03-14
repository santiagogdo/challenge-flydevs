import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles['spinner__double-bounce1']} />
      <div className={styles['spinner__double-bounce2']} />
    </div>
  );
};

export default Spinner;