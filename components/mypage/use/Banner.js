import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;

  justify-content: center;
  align-items: center;
  border-top: 2px solid #111;
  border-bottom: 2px solid #111;
  #type {
    width: 15%;
  }

  #placeName,
  #paymentDate {
    width: 11%;
  }
  #reservationDate {
    width: 40%;
  }
  #state {
    width: 11%;
  }
  #review {
    width: 13%;
  }
  @media screen and (max-width: 1170px) {
    width: 96vw;
  }
  @media screen and (max-width: 858px) {
    display: none;
  }
`;

const Banner = () => {
  return (
    <Wrapper>
      <div id="type">상품 종류</div>
      <div id="placeName">지점명</div>
      <div id="reservationDate">예약 시간 </div>
      <div id="paymentDate">결제 시각</div>
      <div id="state">상태</div>
      <div id="review"></div>
    </Wrapper>
  );
};

export default Banner;
