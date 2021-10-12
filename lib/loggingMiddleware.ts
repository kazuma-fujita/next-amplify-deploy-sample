import { Middleware } from 'swr';

export const loggingMiddleware: Middleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    // フックが実行される前...

    // 次のミドルウェア、またはこれが最後のミドルウェアの場合は `useSWR` を処理
    const swr = useSWRNext(key, fetcher, config);

    // フックが実行された後...
    console.log('data in middleware:', swr.data);
    console.log('error in middleware:', swr.error);
    return swr;
  };
};
