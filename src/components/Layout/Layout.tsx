import type { NextPage } from 'next';
import Head from 'next/head';
import styles from './Layout.module.scss';

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Head>
        <title>Movie showcase</title>
        <meta name="description" content="Movie showcase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
