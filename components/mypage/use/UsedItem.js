import { Backdrop, CircularProgress } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../ui/Button';
const Wrapper = styled.section`
  width: 100%;
  height: 70px;
  line-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #111;

  .type {
    width: 15%;
  }
  .placeName,
  .paymentDate {
    line-height: 16px;
    width: 11%;
  }
  .reservationDate {
    width: 40%;
  }
  .reservationDate .time {
    display: flex;
    justify-content: space-around;
  }
  .state {
    width: 11%;
    line-height: 18px;
    font-size: 15px;
  }
  button {
    width: 13%;
    padding: 0;
  }
  .date,
  .time {
    font-weight: 800;
    line-height: 1.2rem;
  }
  .time {
    font-size: 1.3rem;
    color: #6a9eff;
  }
  .after {
    color: #663377;
  }
  .before {
    color: #7eae46;
  }
  .hide,
  .detail {
    display: none;
  }
  @media screen and (max-width: 1170px) {
    width: 96vw;
  }
  @media screen and (max-width: 858px) {
    overflow: hidden;
    display: inline-block;
    height: 330px;
    width: 100%;
    line-height: 1rem;
    padding: 10px 10px;

    transition: 0.5s;
    .type {
      line-height: 2rem;
      width: 100%;
      font-size: 1.5rem;
    }
    .placeName {
      line-height: 3rem;
      width: 100%;
      font-size: 1rem;
    }
    .paymentDate,
    .reservationDate {
      width: 100%;
    }

    .reservationDate {
      padding-bottom: 20px;
    }
    .reservationDate .time {
      width: 100%;
    }

    .state {
      width: 100%;
    }
    .state .after,
    .state .before {
      position: relative;
      width: 100px;
      top: -180px;
      left: 80%;
    }

    .hide {
      display: inline-block;
      font-weight: 900;
      color: #888;
      padding-bottom: 2px;
      border-bottom: 2px solid #111;
      margin-bottom: 10px;
    }

    button {
      width: 100%;
      padding: 0.25rem 1rem;
    }
    &.show {
      height: 300px;
      transition: 0.5s;
    }
  }
`;
const UsedItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const setLoadingHandler = () => {
    setIsLoading(true);
  };
  return (
    <Wrapper>
      <div className="type">{props.item.productType}</div>
      <div className="placeName">{props.item.placeName}</div>
      <div className="hide">예약 시간</div>
      <div className="reservationDate">
        <div className="time">
          <div className="start">
            <div className="date">{props.item.reservationStartDate}</div>
            <div className="time">{props.item.reservationStartTime}</div>
          </div>
          {'~'}
          <div className="end">
            <div className="date">{props.item.reservationEndDate}</div>
            <div className="time">{props.item.reservationEndTime}</div>
          </div>
        </div>
      </div>
      <div className="hide">결제 시각</div>
      <div className="paymentDate">
        <div className="date">{props.item.reservationCompletedDate}</div>
        <div className="time">{props.item.reservationCompletedTime}</div>
      </div>
      <div className="state">
        {props.item.usageStatus === '이용 완료' ? (
          <p className="after">{props.item.usageStatus}</p>
        ) : props.item.usageStatus === '이용 중' ? (
          <p className="before">{props.item.usageStatus}</p>
        ) : (
          <p className="before">{props.item.usageStatus}</p>
        )}
      </div>
      <Button onClick={setLoadingHandler}>
        <Link href={`/mypage/reservation/${props.item.reservationId}`}>
          예약 상세
        </Link>
      </Button>
      {isLoading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default UsedItem;
