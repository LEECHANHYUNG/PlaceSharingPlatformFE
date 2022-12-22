import React from 'react';
import styled from 'styled-components';
import Card from '../ui/Card';
const StyledCard = styled(Card)`
  .item {
    font-size: 1rem;
    font-weight: 900;
  }
  .data {
    margin-left: 80px;
    font-size: 1.3rem;
    font-weight: 900;
    color: #71716f;
    margin-bottom: 20px;
  }
  .date-info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-left: 0;
  }
`;

const BookInfo = (props) => {
  const isOffice = props.productType?.includes('사무실');
  return (
    <StyledCard>
      <h1>예약 정보</h1>
      <div className="item">지점명</div>
      <div className="data">{props.placeName}</div>
      <div className="item">상품명</div>
      <div className="data">{props.productType}</div>
      <div className="item">날짜</div>
      <div className="data date-info">
        <div>
          <div className="date">{props.reservationStartDate}</div>
          {!isOffice && (
            <div className="time">{`${props.reservationStartTime}` || ''}</div>
          )}
        </div>
        <div className="break">~</div>
        <div>
          <div className="date">{props.reservationEndDate}</div>
          {!isOffice && (
            <div className="time">{`${props.reservationEndTime}` || ''}</div>
          )}
        </div>
      </div>
    </StyledCard>
  );
};

export default BookInfo;
