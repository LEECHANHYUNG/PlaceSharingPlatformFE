import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  border-top: 2px solid #111;
  border-bottom: 2px solid #111;
  font-weight: 800;

  #state,
  #amount {
    width: 12%;
  }
  #content {
    width: 15%;
  }

  #placeName {
    width: 35%;
  }
  #addTime {
    width: 26%;
    text-align: center;
  }
  @media screen and (max-width: 858px) {
    display: none;
  }
`;

const Banner = () => {
  return (
    <Wrapper>
      <div id="state">상태</div>
      <div id="amount">적립금</div>
      <div id="content">내용</div>
      <div id="placeName">지점명</div>
      <div id="addTime">적용 일자</div>
    </Wrapper>
  );
};

export default Banner;
