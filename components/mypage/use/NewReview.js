import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import TextArea from '../../ui/TextArea';

const Wrapper = styled.section`
  position: relative;
  width: 60vw;
  float: left;
  top: 80px;
  margin-left: 150px;

  h1 {
    font-size: 25px;
  }
  .rating {
    position: relative;
    display: flex;
    margin: 10px 0;
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
  .rating-container {
    position: absolute;
  }
  .rating input {
    position: relative;
    width: 20px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
  }
  .rating input::before {
    content: '★';
    position: absolute;
    font-size: 24px;
    postition: absolute;
    left: 4px;
  }

  .rating input:nth-child(2n + 1)::before {
    right: 4px;
    left: 4px;
  }
  .rating input:hover ~ input::before,
  .rating input:hover::before,
  .rating input:checked ~ input::before,
  .rating input:checked::before {
    color: #1f9cff;
  }
  @media screen and (max-width: 858px) {
    width: 90vw;
    margin-left: 10px;
  }
`;
const NewReview = () => {
  const [ratingCount, setRatingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const addCommentHandler = async (e) => {
    if (ratingCount === 0) {
      alert('평점을 입력해주세요.');
      return;
    } else {
      setIsLoading(true);
      const comment = e.target.parentNode.childNodes[3].value;
      try {
        const response = await axios({
          url: '/api/mypage/review',
          method: 'post',
          data: {
            accessToken: session.data.user.accessToken,
            ratingScore: ratingCount,
            ratingReview: comment,
            reservationId: router.query.id,
          },
        });
        if (response.status === 200) {
          setIsLoading(false);
          alert('리뷰 등록 완료');
          router.replace('/mypage/review');
        } else {
          throw new Error(response.data);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  return (
    <Wrapper>
      <h1>리뷰 작성</h1>
      <label htmlFor="rating" className="rating-container">
        평점
      </label>
      <div className="rating" onChange={(e) => setRatingCount(+e.target.value)}>
        <input type="radio" name="rating" value={5} className="rating-input" />
        <input type="radio" name="rating" value={4} className="rating-input" />
        <input type="radio" name="rating" value={3} className="rating-input" />
        <input type="radio" name="rating" value={2} className="rating-input" />
        <input type="radio" name="rating" value={1} className="rating-input" />
      </div>
      <TextArea
        placeholder={'최대 100자 입력 가능'}
        addCommentHandler={addCommentHandler}
        maxLength={100}
        newReview={true}
        isLoading={isLoading}
      />
      {isLoading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default NewReview;
