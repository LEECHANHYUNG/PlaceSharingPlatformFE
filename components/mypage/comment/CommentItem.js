import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: ${(props) => (props.reviewComment ? '65px' : '65px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid #111;
  overflow-y: hidden;
  .content {
    height: 65px;
    top: 20px;
    position: relative;
    width: 76%;
    cursor: pointer;
  }
  &.show,
  &.show .content {
    min-height: 65px;
    height: auto;
  }

  .placeName,
  .writingTime {
    word-break: break-all;
    line-height: 1.2rem;
    width: 12%;
    font-size: 0.8rem;
  }
  .date,
  .time {
    line-height: 1.2rem;
  }

  .content {
    display: block;
  }

  .rotate {
    transform: rotateX(180deg);
  }
  @media screen and (max-width: 1170px) {
    .content {
      width: 50%;
    }

    .placeName,
    .writingTime {
      width: 15%;
    }
    .placeName {
      width: 35%;
    }

    .date {
      position: relative;
      top: 0px;
      font-size: 0.7rem;
      height: 100%;
    }
  }

  @media screen and (max-width: 620px) {
    overflow: hidden;
    .content {
      width: 60%;
    }

    .placeName {
      width: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      font-weight: 900;
    }
    .writingTime {
      width: 18%;
    }
  }
`;
const CommentItem = ({ item, reviewComment }) => {
  const showDetailHandler = (e) => {
    e.target.parentNode.classList.toggle('show');
  };
  return (
    <Wrapper reviewComment={reviewComment || false}>
      <div className="content" onClick={showDetailHandler}>
        {item.context}
      </div>
      <div className="placeName">{item.placeName || item.writer}</div>
      <div className="writingTime">
        <div className="date">{item.writtenDate}</div>
        <div className="time">{item.writtenTime}</div>
      </div>
    </Wrapper>
  );
};

export default CommentItem;
