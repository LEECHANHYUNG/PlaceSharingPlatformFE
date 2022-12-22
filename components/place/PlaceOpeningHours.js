import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  margin-top: ${(props) => (props.main ? '30px' : '20px')};
  padding-bottom: ${(props) => (props.main ? '30px' : '0')};
  border-bottom : ${(props) => (props.main ? '3px solid #999' : 'none')};
  h1 {
    font-size: ${(props) => (props.main ? '1.5rem' : '1rem')};
    padding: 0 ${(props) => (props.main ? '0' : '1rem')};
  }

  .time {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    padding: 0 30px;
  }
  .time p {
    font-size: 13px;
    color: #6a9eff;
    font-weight: 900;
  }
  .open div,
  .close div {
    font-size: 1.2rem;
    font-weight: 900;
  }
  .line {
    height: 6px;
    background #999;
    margin-top : 20px;
  }
 
  .info{
    
    font-size: 0.9rem;
    font-weight:  900;
    margin-top: 10px;
    color: #6a9eff;
  }
  @media screen and (max-width: 1170px){
   
  }
  @media screen and (max-width: 858px){
    .time{
      padding: 0px;
    }
    .time p{
      font-size : 12px;
      width: 100%;
    }
   
    .info {
      margin-left: 20px;
      font-size: 11px;
    }
  }
`;
const PlaceOpeningHours = ({ openTime, closeTime, closedDays, main }) => {
  const days = {
    Mon: '월',
    Tue: '화',
    Wed: '수',
    Thu: '목',
    Fri: '금',
    Sat: '토',
    Sun: '일',
  };
  const getClosedDay = () => {
    const closedDayKor = closedDays.map((day) => days[day]);
    return closedDayKor.length
      ? `매주 ${closedDayKor.join(',')} 휴무`
      : '휴무일 없음';
  };
  return (
    <Wrapper main={main}>
      <h1>영업 시간</h1>
      <div className="time">
        <div className="open">
          <p>오픈 시간</p>
          <div>{openTime}</div>
        </div>
        <div>~</div>
        <div className="close">
          <p>마감 시간</p>
          <div>{closeTime}</div>
        </div>
        <div className="info">
          <div className="closed-days">※ {getClosedDay()}</div>
          <div className="description">※ 사무실 연중무휴</div>
        </div>
      </div>
      {main ? '' : <div className="line"></div>}
    </Wrapper>
  );
};

export default PlaceOpeningHours;
