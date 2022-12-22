import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  height: 60px;
  line-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #111;
  overflow-y: hidden;
  .state,
  .amount {
    width: 12%;
  }
  .content {
    width: 15%;
  }

  .placeName {
    width: 35%;
  }
  .addTime {
    width: 26%;
    text-align: center;
  }
  @media screen and (max-width: 858px) {
    font-size: 13px;
    position: relative;
    .state {
      display: none;
    }
    line-height: 1rem;
    .placeName {
      word-break: break-all;
    }
    .content {
      position: absolute;
      top: 5px;
      left: 10px;
      font-weight: 700;
      width: 20%;
    }
    .amount {
      position: absolute;
      top: 5px;
      right: 40px;
    }
    .addTime {
      position: absolute;
      bottom: 10px;
      right: 0px;
    }
    .placeName {
      width: 50%;
    }
  }
`;
const PointItem = ({ item }) => {
  return (
    <Wrapper>
      <div className="state">{item.status}</div>
      <div className="amount">{item.changePoint}</div>
      <div className="content">{item.info}</div>
      <div className="placeName">{item.issuer}</div>
      <div className="addTime">{item.updateDate}</div>
    </Wrapper>
  );
};

export default PointItem;
