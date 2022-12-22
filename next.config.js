const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');
module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      async redirects() {
        return [
          {
            source: '/place/book',
            destination: '/',
            permanent: true,
          },
        ];
      },
      images: {
        domains: ['palce-sharing-platform.s3.ap-northeast-2.amazonaws.com'],
      },
      env: {
        baseURL: 'http://localhost:8080/',
        signIn: '/auth/signin',
        signUp: 'http://localhost:8080/auth/signup',
        myPage: '/mypage',
        refresh: '/auth/refresh',
        NEXTAUTH_SECRET: 'mysecretofnextjsnextauth',
        main: 'http://localhost:8080/main',
        mainSearch: 'http://localhost:8080/main/search',
      },
    };
  }
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      async redirects() {
        return [
          {
            source: '/place/book',
            destination: '/',
            permanent: false,
          },
        ];
      },
      images: {
        domains: ['palce-sharing-platform.s3.ap-northeast-2.amazonaws.com'],
      },
      env: {
        baseURL:
          'https://port-0-place-sharing-platform-883524lbtbkgal.gksl2.cloudtype.app/',
        signIn: '/auth/signin',
        signUp: '/auth/signup',
        myPage: '/mypage',
        refresh: '/auth/refresh',
        NEXTAUTH_SECRET: 'mysecretofnextjsnextauth',
        main: 'https://port-0-place-sharing-platform-883524lbtbkgal.gksl2.cloudtype.app/main',
        mainSearch:
          'https://port-0-place-sharing-platform-883524lbtbkgal.gksl2.cloudtype.app/main/search',
      },
    };
  }
};
