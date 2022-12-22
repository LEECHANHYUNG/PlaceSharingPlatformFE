import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import Payment from './Payment';
import Refund from './Refund';

const Wrapper = styled.section`
  position: relative;
  width: 70vw;
  float: left;
  top: 80px;

  h1 {
    font-size: 32px;
    margin-left: 150px;
  }
  .left {
    width: 60%;
  }
  .right {
    width: 40%;
  }
  .data {
    font-size: 22px;
    font-weight: 700;
    color: #6a9eff;
    margin-left: 50px;
  }
  .data p {
    font-size: 1rem;
    color: #111;
  }
  .reservation-time {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .start {
    margin-right: 100px;
  }
  .new-review {
    text-decoration: underline;
    cursor: pointer;
  }
  @media screen and (max-width: 1170px) {
    width: 98vw;
    .data {
      font-size: 22px;
      margin-left: 10px;
    }
  }

  @media screen and (max-width: 858px) {
    .data {
      font-size: 13px;
    }
  }
`;
const StyledCard = styled(Card)`
  margin-left: 150px;
  border: 1px solid #6a9eff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .btn {
    position: absolute;
    width: 230px;
    bottom: 0px;
    right: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media screen and (max-width: 1170px) {
    margin-left: 50px;
    width: 90%;
  }
  @media screen and (max-width: 858px) {
    width: 98vw;
    margin-left: 0;
    position: relative;
    & h1 {
      margin-left: 20px;
    }
    flex-direction: column;
    .left {
      width: 100%;
    }
    .right {
      width: 100%;
      display: flex;
      justify-content: space-between;
      text-align: left;
      flex-wrap: nowrap;
    }

    .right .data {
      font-size: 15px;
      margin-left: 10px;
      text-align: left;
    }
    .reservation-time {
      width: 100%;
      justify-content: flex-start;
    }
    .btn button {
      width: 40%;
      font-size: 13px;
    }

    .review {
      position: absolute;
      top: 10px;
      right: 5px;
      display: flex;
      align-items: center;
    }
  }
`;
const Detail = (props) => {
  const router = useRouter();
  const session = useSession();
  const [detailItems, setDetailItems] = useState(props);
  const [isLoading, setIsLoading] = useState(false);

  const cancelReservationHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: '/api/mypage/cancel',
        method: 'post',
        data: {
          accessToken: session.data.user.accessToken,
          reservationId: router.query.id,
        },
      });
      if (response.status === 200) {
        setIsLoading(false);
        alert('예약 취소 완료');
        setDetailItems(response.data);
      } else {
        throw new Error();
      }
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };
  const completeReservationHandler = async () => {
    setIsLoading(true);

    try {
      const response = await axios({
        url: '/api/mypage/reservation-complete',
        method: 'post',
        data: {
          accessToken: session.data.user.accessToken,
          reservationId: router.query.id,
        },
      });
      if (response.status === 200) {
        setIsLoading(false);

        alert('예약 확정 완료');
        setDetailItems(response.data);
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const isDesk = detailItems.resData.roomType.includes('데스크');
  return (
    <Wrapper>
      <header>
        <h1>예약 내역</h1>
      </header>
      <StyledCard>
        <div className="left">
          <div className="place-name">
            <h3>{isDesk ? '좌석 번호' : 'Room번호'}</h3>
            <div className="data">{detailItems.resData.roomId}</div>
          </div>
          <div className="place-name">
            <h3>예약 지점</h3>
            <div className="data">{detailItems.resData.placeName}</div>
          </div>
          <div className="room-type">
            <h3>상품명</h3>
            <div className="data">{detailItems.resData.roomType}</div>
          </div>
          <div className="res-time">
            <h3>예약 시간</h3>
            <div className="data reservation-time">
              <div className="start">
                {!detailItems.resData.roomType.includes('사무실') ? (
                  <p>시작시간</p>
                ) : (
                  <p>시작일</p>
                )}
                <div className="date">{detailItems.resData.resStartDate}</div>
                {!detailItems.resData.roomType.includes('사무실') ? (
                  <div className="time">{detailItems.resData.resStartTime}</div>
                ) : (
                  ''
                )}
              </div>

              <div className="end">
                {!detailItems.resData.roomType.includes('사무실') ? (
                  <p>종료시간</p>
                ) : (
                  <p>종료일</p>
                )}
                <div className="date">{detailItems.resData.resEndDate}</div>
                {!detailItems.resData.roomType.includes('사무실') ? (
                  <div className="time">{detailItems.resData.resEndTime}</div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="pay-time">
            <h3>결제 일시</h3>
            <div className="data">
              <div className="date">{detailItems.resData.resCompletedDate}</div>
              <div className="time">{detailItems.resData.resCompletedTime}</div>
            </div>
          </div>
          <div className="usage-state">
            <h3>상태</h3>
            <div className="data">{detailItems.resData.usageState}</div>
          </div>
          <div className="review">
            <h3>리뷰</h3>
            <div className="data">
              {detailItems.resData.ratingStatusDescription === '작성 가능' ? (
                <div
                  onClick={() => {
                    props.setNewComment(true);
                  }}
                  className="new-review"
                >
                  <Image src="/svg/pencil.svg" width="16" height="16" />
                  {detailItems.resData.ratingStatusDescription}
                </div>
              ) : (
                <div>{detailItems.resData.ratingStatusDescription}</div>
              )}
            </div>
          </div>
          <div className="saved-mileage">
            <h3>적립 마일리지</h3>
            <div className="data">
              {detailItems.resData.savedMileage.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="btn">
          {detailItems.resData.cancelStatus ? (
            <Button onClick={cancelReservationHandler}>예약 취소</Button>
          ) : (
            ''
          )}
          {detailItems.resData.completeStatus ? (
            <Button onClick={completeReservationHandler}>예약 확정</Button>
          ) : (
            ''
          )}
        </div>
      </StyledCard>
      <h1>결제 내역</h1>
      {Object.keys(detailItems.payData).map((elem) => (
        <div key={elem}>
          {detailItems.payData[elem].refund ? (
            <Refund
              refund={detailItems.payData[elem].refund}
              key={`refund${elem}`}
            />
          ) : (
            ''
          )}
          <Payment
            totalPrice={detailItems.totalPrice}
            payData={detailItems.payData[elem].payment}
            key={`payment${elem}`}
          />
        </div>
      ))}
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

export default Detail;
