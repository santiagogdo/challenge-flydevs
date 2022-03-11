import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import { CustomContextProvider } from '../components/ContextProvider/ContextProvider';

function RootApp({ Component, pageProps }: AppProps) {
  return (
    <CustomContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CustomContextProvider>
  )
};

export default RootApp;
