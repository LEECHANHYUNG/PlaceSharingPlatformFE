import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  border-bottom: 3px solid #999;
  padding-bottom: 30px;
  h1 {
    margin-top: 20px;
    font-size: 2rem;
  }
  h1 > div {
    display: inline-block;
    color: #6a9eff;
  }
  .item {
    margin-top: 20px;
    display: inline-block;
    margin-right: 20px;
    font-size: 1.2rem;
    font-weight: 600;
  }
  .item > div {
    display: inline-block;
    color: #6a9eff;
  }
  @media screen and (max-width: 858px) {
    h1 {
      display: none;
    }
    .item {
      font-size: 16px;
    }
  }
`;
const PlaceItemCount = ({ placeName, itemCount }) => {
  return (
    <Wrapper>
      <h1>
        <div>{placeName}</div>에서 이용 가능한 전체 상품
      </h1>
      <div>
        <div className="item">
          1인 데스크 <div>{itemCount[0]}</div>개
        </div>
        <div className="item">
          회의실 <div>{itemCount[1]}</div>개
        </div>
        <div className="item">
          사무실 <div>{itemCount[2]}</div>개
        </div>
      </div>
    </Wrapper>
  );
};

export default PlaceItemCount;
