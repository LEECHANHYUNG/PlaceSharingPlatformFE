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
  #content {
    width: 86%;
  }

  #placeName,
  #writingTime {
    width: 12%;
  }
  @media screen and (max-width: 1170px) {
    width: 94vw;
    #content {
      width: 50%;
    }

    #writingTime {
      width: 15%;
    }
    #placeName {
      width: 35%;
    }
  }

  @media screen and (max-width: 620px) {
    #content {
      width: 50%;
    }
    #writingTime {
      width: 18%;
    }
    #placeName {
      display: none;
    }
  }
`;

const Banner = (props) => {
  return (
    <Wrapper>
      <div id="content">내용</div>
      <div id="placeName">{props.reviewComment ? '작성자' : '지점명'}</div>
      <div id="writingTime">작성일</div>
    </Wrapper>
  );
};

export default Banner;
