import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 0 20px;
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 900;
  font-size: 1.5rem;
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
  width: 100%;
  & :nth-child(3) {
    margin: 0 10px;
  }
  @media screen and (max-width: 758px) {
    font-size: 1rem;
  }
`;

const ReviewBanner = ({ rating, count }) => {
  return (
    <Wrapper>
      <Image src="/svg/star.svg" width="24" height="24" className="img" />
      <div className="rating">{rating} / 5.0</div>
      <div>·</div>
      <div>후기 {count}개</div>
    </Wrapper>
  );
};

export default ReviewBanner;
