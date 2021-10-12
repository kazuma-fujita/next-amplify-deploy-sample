import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { loggingMiddleware } from '../lib/loggingMiddleware';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ use: [loggingMiddleware] }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
export default MyApp;
