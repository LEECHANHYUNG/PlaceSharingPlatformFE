import React from 'react';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

const StyledCard = styled(Card)`
  border: 1px solid #6a9eff;
  position: relative;
  width: 90%;
  margin-left: 150px;

  .pay-type {
    position: absolute;
    top: 30px;
    left: 10px;
  }
  main {
    padding: 50px 0;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-left: 50px;
  }
  main > div {
    width: 78%;
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
  .comment {
    position: absolute;
    top: 3px;
    left: 127%;
    width: 200px;
    font-size: 13px;
  }
  @media screen and (max-width: 1170px) {
    width: 90%;
    margin-left: 50px;

    main {
      margin-left: 0px;
    }
  }
  @media screen and (max-width: 858px) {
    width: 100%;
    margin-left: 0px;

    main {
      margin-left: 0px;
      padding: 5px 0;
    }
    h3 {
      font-size: 15px;
    }
    .data {
      font-size: 18px;
      margin: 10px 0;
    }
    main > div {
      width: 90%;
      justify-content: space-between;
    }
    .data {
      line-height: 0px;
    }
    .pay-type {
      top: 10px;
      left: 5px;
    }
  }
`;
const Payment = ({ payData }) => {
  return (
    <StyledCard>
      <div className="pay-type">
        <div className="data">{payData.payType}</div>
        {payData.payType === '후결제' ? (
          <div className="comment">(이용 완료후 결제 예정 금액)</div>
        ) : (
          ''
        )}
      </div>
      <main>
        <div className="real-price">
          <h3>실 결제 금액</h3>
          <div className="data">{payData.payPrice.toLocaleString()}</div>
        </div>
        <div className="mileage-price">
          <h3>마일리지 결제 </h3>
          <div className="data">{payData.payMileage.toLocaleString()}</div>
        </div>
      </main>
      {payData.receipt.includes('카카오페이') ? (
        <div>영수증 : {payData.receipt}</div>
      ) : (
        <Button>
          <a href={payData.receipt}>영수증 확인</a>
        </Button>
      )}
    </StyledCard>
  );
};

export default Payment;
