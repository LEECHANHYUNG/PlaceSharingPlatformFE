import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { paymentSliceActions } from '../../store/payment';

const Wrapper = styled(Card)`
  border: 3px solid #6a9eff;
  h1 {
    text-decoration: underline;
  }
  .price {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .price p {
    font-size: 1.7rem;
  }
  @media screen and (max-width: 1260px) {
    margin-left: 22px;
    width: 92%;
  }
`;

const PaymentMain = ({ totalPrice, isOffice }) => {
  const mileageUse = useSelector((state) => state.payment.useMileage);
  const paymentType = useSelector((state) => state.payment.paymentType);
  const dispatch = useDispatch();
  const showPaymentTypeHandler = () => {
    dispatch(paymentSliceActions.getPaymentForm(true));
    dispatch(
      paymentSliceActions.getPaymentAmount(
        (totalPrice - +mileageUse).toLocaleString()
      )
    );
  };
  return (
    <Wrapper>
      <h1>요금 세부정보</h1>
      <div className="container">
        <div className="price">
          <h3>결제 예정 금액</h3>
          <p>
            <Image src="/svg/won.svg" width="10" height="10" />
            {totalPrice?.toLocaleString()}
          </p>
        </div>
        {paymentType === 'FULL_PAYMENT' && !isOffice ? (
          <div className="price">
            <h5>선결제</h5>
            <p>
              <Image src="/svg/won.svg" width="10" height="10" />
              {(+totalPrice - +mileageUse).toLocaleString()}
            </p>
          </div>
        ) : (
          ''
        )}
        {paymentType === 'DEPOSIT' && !isOffice ? (
          <div className="price">
            <h5>보증금</h5>
            <p>
              <Image src="/svg/won.svg" width="10" height="10" />
              {(totalPrice * 0.2).toLocaleString()}
            </p>
          </div>
        ) : (
          ''
        )}
        {paymentType === 'DEPOSIT' && !isOffice ? (
          <div className="price">
            <h5>후결제</h5>
            <p>
              <Image src="/svg/won.svg" width="10" height="10" />
              {(+totalPrice * 0.8 - +mileageUse).toLocaleString()}
            </p>
          </div>
        ) : (
          ''
        )}
        <div className="price">
          <h5>마일리지 결제</h5>
          <p>
            <Image src="/svg/won.svg" width="10" height="10" />
            {Number(mileageUse).toLocaleString()}
          </p>
        </div>
        {paymentType === 'FULL_PAYMENT' && !isOffice ? (
          <div className="price">
            <h5>적립 예정 마일리지</h5>
            <p>
              <Image src="/svg/won.svg" width="10" height="10" />
              {Math.floor(+(totalPrice - mileageUse) * 0.05).toLocaleString()}
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
      {paymentType === 'DEPOSIT' && !isOffice ? (
        <Button onClick={showPaymentTypeHandler}>
          <Image src="/svg/won.svg" width="10" height="10" />
          {(totalPrice * 0.2 - +mileageUse).toLocaleString()}결제
        </Button>
      ) : !isOffice ? (
        <Button onClick={showPaymentTypeHandler}>
          <Image src="/svg/won.svg" width="10" height="10" />
          {(totalPrice - +mileageUse).toLocaleString()}결제
        </Button>
      ) : (
        ''
      )}

      {isOffice ? (
        <Button onClick={showPaymentTypeHandler}>
          <Image src="/svg/won.svg" width="10" height="10" />
          {0}결제
        </Button>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default PaymentMain;
