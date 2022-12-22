import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid #111;
  border-bottom: 2px solid #111;
  text-align: left;
  #content {
    width: 70%;
  }
  #placeName,
  #writingTime {
    width: 15%;
  }
  @media screen and (max-width: 1170px) {
    width: 94vw;
  }
  @media screen and (max-width: 858px) {
    display: none;
  }
`;

const Banner = () => {
  return (
    <Wrapper>
      <div id="content">내용</div>
      <div id="placeName">지점명</div>
      <div id="writingTime">작성일</div>
    </Wrapper>
  );
};

export default Banner;
