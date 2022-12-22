import { Provider } from 'react-redux';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import MainHeader from '../components/layout/MainHeader';
import store from '../store';
import RefreshTokenHandler from '../components/auth/RefreshTokenHandler';
import Head from 'next/head';
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta name="viewport" content="width = device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.kakaokey}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
        <MainHeader />
        <Component {...pageProps} />
        <RefreshTokenHandler />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
