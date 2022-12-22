import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import CommentList from '../comment/CommentList';

const Wrapper = styled.section`
  border-top: 1px solid #111;
  width: 100%;
  height: 65px;
  padding-top: 20px;
  overflow-y: hidden;
  position: relative;
  &.show {
    height: auto;
  }
  .rating-score {
    position: absolute;
    top: 0px;
    font-size: 12px;
    font-weight: 700;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: top;
    padding-bottom: 20px;
  }
  .container .content {
    padding-left: 70px;
    display: inline-block;
    width: 70%;
    cursor: pointer;
  }
  .container .placeName,
  .container .writing-time {
    font-size: 0.9rem;
    width: 15%;
    overflow-y: hidden;
  }
  .detail {
    margin: 20px 50px;
  }
  .detail h3 {
    margin-top: 20px;
  }
  .detail .time {
    display: flex;
    justify-content: space-between;
    width: 50%;
    font-size: 1rem;
    font-weight: 800;
  }
  .detail .time .time {
    color: #6a9eff;
  }
  h5 {
    margin-top: 20px;
    cursor: pointer;
    text-decoration: underline;
  }
  @media screen and (max-width: 858px) {
    font-size: 14px;
    height: 60px;

    .container .content {
      padding-left: 0px;
    }
    .container .placeName {
      position: absolute;
      top: 5px;
      width: auto;
      right: 10px;
      font-weight: 900;
    }
    .container .writing-time {
      position: absolute;
      top: 20px;
      width: auto;
      right: 10px;
    }
    .detail {
      margin: 0;
    }
    .detail .time {
      width: 80%;
    }
  }
`;
const ReviewItem = ({ item }) => {
  const [commentData, setCommentData] = useState();
  const [paginationData, setPaginationData] = useState();
  const [hide, setHide] = useState(false);
  const showDetailHandler = (e) => {
    e.target.parentNode.parentNode.classList.toggle('show');
  };
  const session = useSession();
  const showCommentHandler = async (e) => {
    if (!commentData) {
      try {
        const response = await axios({
          url: '/api/mypage/mypage',
          method: 'post',
          data: {
            url: `mypage/review/${e.target.id}?page=`,
            accessToken: session.data.user.accessToken,
            page: 1,
          },
        });
        if (response.status === 200) {
          setPaginationData(response.data.paginationData.maxPage);
          setCommentData(response.data.commentData);
          setHide(false);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {}
    } else {
      setCommentData();
    }
  };
  return (
    <Wrapper>
      <div className="container">
        <div className="rating-score">
          <Image src="/svg/star.svg" width="13" height="13" />
          {`${item.ratingScore} / 5.0`}
        </div>
        <div className="content" onClick={showDetailHandler}>
          {item.ratingContext}
        </div>
        <div className="placeName">{item.placeName}</div>
        <div className="writing-time">
          <div className="date">{item.writtenDate}</div>
          <div className="time">{item.writtenTime}</div>
        </div>
      </div>
      <div className="detail">
        <div className="detail-item">
          <h3>상품명</h3>
          <div>{item.roomType}</div>
        </div>
        <div className="detail-item">
          <h3>이용 기간</h3>
          <div className="time">
            <div className="start">
              <div className="day">{item.resStartDate}</div>
              <div className="time">{item.resStartTime || ''}</div>
            </div>
            {'~'}
            <div className="end">
              <div className="day">{item.resEndDate}</div>
              <div className="time">{item.resEndTime || ''}</div>
            </div>
          </div>
        </div>
      </div>
      {item.commentQuantity !== '0' ? (
        <h5 id={item.ratingId} onClick={showCommentHandler}>
          댓글 수{item.commentQuantity}개
        </h5>
      ) : (
        <h5>댓글 수 0개</h5>
      )}
      {commentData && +item.commentQuantity !== 0 ? (
        <CommentList
          item={commentData}
          paginationData={paginationData}
          ratingId={item.ratingId}
        />
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default ReviewItem;
