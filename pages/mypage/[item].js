import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Banner from '../../components/mypage/Banner';
import Header from '../../components/mypage/Header';
import Usage from '../../components/mypage/use/Usage';
import Comment from '../../components/mypage/comment/Comment';
import Point from '../../components/mypage/point/Point';
import Qna from '../../components/mypage/qna/Qna';
import { getSession, signOut } from 'next-auth/react';
import axios from 'axios';
import Review from '../../components/mypage/review/Review';
import Edit from '../../components/mypage/Edit/Edit';
import Head from 'next/head';
const Wrapper = styled.section`
  width: 100%;
  .item {
    width: 79vw;
    display: inline-block;
    float: left;
    padding-left: 20px;
    padding-top: 60px;
  }
  @media screen and (max-width: 1170px) {
    width: 100%;
    margin: 0;
  }
  @media screen and (max-width: 858px) {
    .item {
      width: 98%;
      padding-left: 10px;
    }
  }
`;

const Mypage = (props) => {
  const router = useRouter();
  return (
    <Wrapper>
      <Head>
        <title>Place Sharing - {router.query.item}</title>
        <meta
          name="description"
          content={`공간 대여 플랫폼,${router.query.item}`}
        />
      </Head>
      <Header userData={props.userData} />
      <Banner />
      {router.query.item === '' && <div className="item"></div>}
      {router.query.item === 'usage' && (
        <section className="item">
          <Usage
            item={props.reservationData}
            paginationData={props.paginationData.maxPage}
          />
        </section>
      )}
      {router.query.item === 'review' && (
        <section className="item">
          <Review
            item={props.reviewData}
            paginationData={props.paginationData.maxPage}
          />
        </section>
      )}

      {router.query.item === 'comment' && (
        <section className="item">
          <Comment
            item={props.commentData}
            paginationData={props.paginationData.maxPage}
          />
        </section>
      )}
      {router.query.item === 'mileage' && (
        <section className="item">
          <Point
            item={props.mileageData}
            paginationData={props.paginationData.maxPage}
          />
        </section>
      )}
      {router.query.item === 'qna' && (
        <section className="item">
          <Qna
            item={props.qnaData}
            paginationData={props.paginationData.maxPage}
          />
        </section>
      )}
      {router.query.item === 'edit' && (
        <section className="item">
          <Edit item={props.userInfoData} />
        </section>
      )}
    </Wrapper>
  );
};

export async function getServerSideProps(context) {
  const params = context.params;
  const session = await getSession({ req: context.req });

  //if (!session.user.accessToken) {
  //  signOut();
  //  return {
  //    redirect: {
  //      destination: '/auth/signin',
  //      permanent: false,
  //    },
  //  };
  //}
  try {
    const response = await axios({
      url: `${process.env.baseURL}mypage/${params.item}?page=1`,
      headers: {
        Authorization: session.user.accessToken,
      },
      rejectUnauthorized: false,
    });
    if (response.status === 200) {
      return {
        props: response.data,
      };
    } else {
      throw new Error(response.data);
    }
  } catch (error) {
    return { message: '로그인 정보 만료' };
  }
}

export default Mypage;
