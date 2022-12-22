import React from 'react';
import styled from 'styled-components';
import { SwiperSlide, Swiper } from 'swiper/react';
import Card from '../ui/Card';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper';
import { useRouter } from 'next/router';
import Button from '../ui/Button';

const Wrapper = styled.section`
  margin-top: 150px;
  margin-left: 360px;
  width: 70vw;
  h1 {
    font-size: 2rem;
    text-align: left;
  }
  .place-name {
    margin-left: 20px;
    font-size: 1.3rem;
  }
  .product-type {
    margin-left: 20px;
    font-size: 1.5rem;
  }
  .reservation-time {
    margin-left: 20px;
    font-size: 1.5rem;
  }
  .break {
    font-size: 1rem;
    font-weight: 900;
    margin-left: 90px;
  }
  .no-item {
    margin-left: 20px;
    margin-top: 20px;
    color: #6a9eff;
    font-weight: 700;
  }
  @media screen and (max-width: 1170px) {
    margin-left: 0;
    padding-left: 50px;
    width: 96vw;
  }
  @media screen and (max-width: 858px) {
    padding-left: 0px;
    h1 {
      font-size: 1.5rem;
      margin-left: 20px;
    }
    .place-name,
    .product-type,
    .reservation-time {
      font-size: 1rem;
    }
  }
`;
const CurrentReservation = ({ item }) => {
  const router = useRouter();

  return (
    <Wrapper>
      <h1>현재 사용중인 상품</h1>

      {Object.keys(item).length !== 0 ? (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          draggable={false}
          slidesPerView={1}
          breakpoints={{
            858: {
              slidesPerView: 2,
            },
          }}
        >
          {Object.keys(item).map((elem) => (
            <SwiperSlide key={elem} className="item">
              <Card className="current-reservation-data">
                <h3>지점명</h3>
                <div className="place-name">{item[elem].placeName}</div>
                <h3>상품명</h3>
                <div className="product-type">{item[elem].productType}</div>
                <h3>예약 시간</h3>
                <div className="reservation-time">
                  {`${item[elem].reservationStartDate}
            ${item[elem].reservationStartTime}`}
                </div>
                <div className="break">{'~'}</div>
                <div className="reservation-time">
                  {`${item[elem].reservationEndDate}
              ${item[elem].reservationEndTime}`}
                </div>
                <Button
                  onClick={() => {
                    router.push(
                      `/mypage/reservation/${item[elem].reservationId}`
                    );
                  }}
                >
                  예약 상세
                </Button>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="no-item">현재 사용중인 상품이 없습니다. </div>
      )}
    </Wrapper>
  );
};

export default CurrentReservation;
