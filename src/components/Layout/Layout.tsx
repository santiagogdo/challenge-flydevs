import type { NextPage } from 'next';
import Head from 'next/head';
import styles from './Layout.module.scss';

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Head>
        <title>Movie showcase</title>
        <meta name="description" content="Movie showcase" />
        <link rel="preload" as="font" href="/fonts/Gilroy-Light.woff2" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="/fonts/Okta-Neue-Normal.woff2" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="/fonts/Okta-Neue-Bold.woff2" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="/fonts/Gilroy-Light.woff" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="/fonts/Okta-Neue-Normal.woff" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="/fonts/Okta-Neue-Bold.woff" type="font/woff" crossOrigin="anonymous" />
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
