import React from 'react';
import styled from 'styled-components';
import Card from '../../ui/Card';

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 50px;
  padding-top: 20px;
  border-top: 2px solid #111;
  overflow-y: hidden;
  &.show {
    height: auto;
  }
  .container {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: top;
    line-height: 25px;
    margin-bottom: 20px;
  }
  &.show .container {
    min-height: 50px;
    height: auto;
    transition: all 0.5s;
  }

  .writingTime {
    width: 20%;
  }
  .title,
  .state {
    width: 12%;
  }
  .state.true {
    color: #6a9eff;
    font-weight: 900;
  }
  .content {
    width: 46%;
    cursor: pointer;
  }
  .answer {
    width: 100%;
    padding-top: 10px;
    border-top: 3px solid #111;
    transition: all 0.5s ease-out;
  }
  @media screen and (max-width: 1170px) {
    height: 50px;
    width: 93vw;
    & .show {
      min-height: 50px;
    }
  }
  @media screen and (max-width: 858px) {
    height: 75px;
    position: relative;
    .title {
      position: absolute;
      top: 5px;
      left: 5px;
      width: auto;
      font-weight: 800;
    }
    .answer {
      margin-top: 40px;
    }
    .content {
      width: 80%;
      margin-top: 50px;
      word-break: break-all;
    }
    .writingTime {
      position: absolute;
      width: auto;
      top: 30px;
      right: 10px;
    }
    .state {
      position: absolute;
      top: 50px;
      right: 10px;
      width: auto;
    }
  }
`;
const StyledCard = styled(Card)`
  border: 3px solid #6a93ff;
  height: 200px;
  line-height: 1rem;
  font-weight: 600;
`;
const QnaItem = ({ item }) => {
  const showDetailHandler = (e) => {
    e.target.parentNode.parentNode.classList.toggle('show');
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="title" onClick={showDetailHandler}>
          {item.questionData.inquiryTitle}
        </div>
        <div className="content" onClick={showDetailHandler}>
          {item.questionData.inquiryContext}
        </div>
        <div className="writingTime">
          <div className="date">{item.questionData.writtenDate}</div>
        </div>
        <div className={`state ${item.questionData.processingStatus}`}>
          {item.questionData.processingStatus ? '답변 완료' : '진행중'}
        </div>
      </div>
      {item.questionData.processingStatus ? (
        <div className="answer">
          <h2>답변 내용</h2>
          <StyledCard>{item.answerData.answerContext}</StyledCard>
        </div>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default QnaItem;
