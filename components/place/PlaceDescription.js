import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.section`
  width: 100%;
  padding: 30px 0;
  border-bottom: 3px solid #999;
  position: relative;
  h1 {
    font-size: 1.5rem;
  }
  .description {
    margin-top: 30px;
    margin-right: 60px;
    font-size: 1.2rem;
    line-height: 2.5rem;
    word-break: break-all;
    overflow: hidden;
    height: 90px;
  }
  .description.show {
    min-height: 90px;
    height: auto;
  }
  .detail {
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    color: #aaa;
  }
  @media screen and (max-width: 858px) {
    .description {
      font-size: 14px;
    }
  }
`;
const showDetailHandler = (e) => {
  e.target.previousSibling.classList.toggle('show');
  e.target.innerHTML === '...더보기'
    ? (e.target.innerHTML = '접기')
    : (e.target.innerHTML = '...더보기');
};
const PlaceDescription = ({ description }) => {
  return (
    <Wrapper>
      <h1>Place 설명</h1>
      <div className="description">{description}</div>
      <div className="detail" onClick={showDetailHandler}>
        ...더보기
      </div>
    </Wrapper>
  );
};

export default PlaceDescription;
