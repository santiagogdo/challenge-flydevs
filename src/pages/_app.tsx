import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import { CustomContextProvider } from '../components/ContextProvider/ContextProvider';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

function RootApp({ Component, pageProps }: AppProps) {
  return (
    <CustomContextProvider>
      <Layout>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
    </CustomContextProvider>
  )
};

export default RootApp;
