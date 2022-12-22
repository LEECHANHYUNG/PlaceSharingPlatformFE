import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Card from '../ui/Card';

const Wrapper = styled(Card)`
  border: 3px solid #6a9eff;
  h1 {
    text-decoration: underline;
  }
  .image-container {
    width: 160px;
    height: 120px;
  }
  .image {
    border-radius: 12px;
  }
  .container {
    width: 100%;
    display: flex;
    align-items: end;
  }
  .review-info {
    width: 200px;
    display: flex;
    justify-content: space-around;
    font-weight: 900;
  }
  .count {
    color: #71716f;
  }
  @media screen and (max-width: 1280px) {
    width: 92%;
    margin-left: 22px;
  }
`;

const Payment = (props) => {
  return (
    <Wrapper>
      <h1>결제 정보</h1>
      <div className="container">
        <div className="image-container">
          <Image
            src={
              props.placeImgUrl[0]
                ? props.placeImgUrl[0]
                : '/image/default-image.gif'
            }
            width="160"
            height="120"
            objectPosition="center"
            objectFit="scale-down"
            className="image"
          />
        </div>
        <div className="review-info">
          <div>
            <Image src="/svg/star.svg" width="18" height="18" />
            {props.averageRate}/5.0
          </div>
          <div className="count">후기({props.totalReview})개</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Payment;
