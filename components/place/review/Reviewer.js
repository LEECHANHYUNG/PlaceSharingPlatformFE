import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: #adb5bd;
  padding-bottom: 10px;
  border-bottom: 2px solid #adb5bd;
  .writer-info,
  .type {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.9rem;
  }
  .type {
    margin-top: 5px;
    background: #ced4da;
    border-radius: 3px;
  }
  & .writer-info :nth-child(2) {
    margin: 0 10px;
  }
  & .type :nth-child(1) {
    background: #adb5bd;
    color: #111;
    font-size: 0.7rem;
    font-weight: 700;
    line-height: 1rem;
    border-radius: 5px;
  }
  & .type :nth-child(2) {
    margin-left: 20px;
    font-weight: 900;
    color: #222;
  }
`;

const Reviewer = ({ writer, createDate, type }) => {
  return (
    <Wrapper>
      <div className="writer-info">
        <div>{writer}</div>
        <div>|</div>
        <div>{createDate}</div>
      </div>
      <div className="type">
        <div>상품명:</div>
        <div>{type}</div>
      </div>
    </Wrapper>
  );
};

export default Reviewer;
