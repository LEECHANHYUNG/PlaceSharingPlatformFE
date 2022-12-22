import React from 'react';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

const StyledCard = styled(Card)`
  border: 1px solid #6a9eff;
  position: relative;
  width: 90%;
  margin-left: 150px;

  h1 {
    width: 150px;
    font-size: 30px;
    border-bottom: 1px solid #111;
    padding-bottom: 10px;
  }
  main {
    padding: 50px 0;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
  main > div {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  main .data {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  @media screen and (max-width: 1170px) {
    width: 90%;
    margin-left: 50px;
    main {
      margin-left: 50px;
    }
  }
  @media screen and (max-width: 858px) {
    width: 100%;
    margin-left: 5px;

    h3 {
      font-size: 15px;
    }
    main {
      margin-left: 0px;
      padding: 5px 0;
    }
    .data {
      font-size: 14px;
      margin: 10px 0;
    }
    main > div {
      width: 90%;
      justify-content: space-between;
    }
    main .data {
      margin-top: 11px;
    }
  }
`;
const Payment = ({ refund }) => {
  return (
    <StyledCard>
      <div className="data">환불 내역</div>
      <main>
        <div className="total-price">
          <h3>환불 일자</h3>
          <div className="data">{refund.refundDate}</div>
          <div className="data">{refund.refundTime}</div>
        </div>
        <div className="real-price">
          <h3>환불 금액</h3>
          <div className="data">{refund.refundPrice.toLocaleString()}</div>
        </div>
        <div className="mileage-price">
          <h3>마일리지 결제 </h3>
          <div className="data">{refund.refundMileage.toLocaleString()}</div>
        </div>
      </main>
      {refund.refundReceipt.includes('카카오페이') ? (
        <div>영수증 : {refund.refundReceipt}</div>
      ) : (
        <Button>
          <a href={refund.refundReceipt}>영수증 확인</a>
        </Button>
      )}
    </StyledCard>
  );
};

export default Payment;
