import axios from 'axios';
import { getSession, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import Banner from '../../components/mypage/Banner';
import CurrentReservation from '../../components/mypage/CurrentReservation';
import Header from '../../components/mypage/Header';
import RecentRerservation from '../../components/mypage/RecentRerservation';

const Mypage = (props) => {
  const session = useSession();
  useEffect(() => {
    if (session.status === 'unauthenticated') {
      signOut();
    }
  }, []);
  return (
    <Fragment>
      <Head>
        <title>Place Sharing - 마이페이지</title>
        <meta name="description" content={`공간 대여 플랫폼, 마이페이지`} />
      </Head>
      <Header userData={props.userData} />
      <Banner />
      <CurrentReservation item={props.currentResData} />
      <RecentRerservation item={props.recentResData} />
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  try {
    const response = await axios({
      url: `${process.env.baseURL}mypage`,
      headers: { Authorization: session.user.accessToken },
    });
    if (response.status === 200) {
      return {
        props: response.data,
      };
    } else {
      throw new Error();
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
}

export default Mypage;
