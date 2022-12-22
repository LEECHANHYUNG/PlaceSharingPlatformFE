import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 2px solid #111;
  border-bottom: 2px solid #111;

  #title,
  #state {
    width: 12%;
    line-height: 1rem;
  }
  #writingTime {
    width: 20%;
  }
  #content {
    width: 46%;
  }
  @media screen and (max-width: 1170px) {
    width: 93vw;
    margin: 0 auto;
  }
  @media screen and (max-width: 858px) {
    display: none;
  }
`;

const Banner = () => {
  return (
    <Wrapper>
      <div id="title">제목</div>
      <div id="content">내용</div>
      <div id="writingTime">작성일</div>
      <div id="state">처리 상태</div>
    </Wrapper>
  );
};

export default Banner;
