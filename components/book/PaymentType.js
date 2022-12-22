import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { paymentSliceActions } from '../../store/payment';
import Card from '../ui/Card';

const Wrapper = styled(Card)`
  position: relative;
  .type-radio {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    position: relative;
  }
  .custom-radio input {
    display: none;
  }
  .custom-radio h3 {
    position: relative;
    text-align: left;
    top: -20px;
    left: 20px;
  }
  .custom-radio p {
    position: relative;
    top: -25px;
    left: 40px;
    text-align: left;
    line-height: 1.5rem;
  }
  .radio-btn {
    margin: 10px;
    width: 80%;
    height: 100px;
    border: 3px solid transparent;
    display: inline-block;
    border-radius: 10px;
    posistion: relative;
    text-align: center;
    border: 3px solid #d9dddc;
    cursor: pointer;
  }
  .radio-btn > div {
    width: 25px;
    height: 25px;
    background: #6a9eff;
    position: relative;
    top: -15px;
    left: 100%;
    transform: translateX(-50%);
    border-radius: 50px;
    padding: 3px;
    transition: 0.2s;
    pointer-events: none;
    opacity: 0;
  }
  .custom-radio input:checked + .radio-btn {
    border: 3px solid #6a9eff;
  }
  .custom-radio input:checked + .radio-btn > div {
    opacity: 1;
  }
  .price {
    position: relative;
    top: -40px;
    right: -38%;
  }
  .notice {
    position: absolute;
    width: 100%;
    top: 150px;
    left: 0px;
  }
  @media screen and (max-width: 1280px) {
    margin-left: 0px;
    margin-right: 0px;
    .radio-btn{
      width : 85vw;
    }
    .notice{
      top : 170px;
    }
    .custom-radio p {
      font-size : 11px;
    }
    b{
      font-size : 11px;
    }
`;

const PaymentType = (props) => {
  const dispatch = useDispatch();
  const getSelectedPaymentTypeHandler = (e) => {
    dispatch(paymentSliceActions.getSelectedPaymentType(e.target.value));
  };
  const isOffice = props.productType?.includes('사무실');
  return (
    <Wrapper>
      <h1>결제 방식 선택</h1>
      <div className="type-radio">
        {!isOffice && (
          <label className="custom-radio">
            <input
              type="radio"
              name="type"
              value="FULL_PAYMENT"
              onClick={getSelectedPaymentTypeHandler}
            />
            <span className="radio-btn">
              <div>
                <Image src="/svg/checked.svg" width="25" height="25" />
              </div>
              <h3>선결제</h3>
              <i className="price">
                <Image src="/svg/won.svg" width="10" height="10" />
                {(+props.totalPrice).toLocaleString()}
              </i>

              <p>이용 금액을 예약 단계에서 결제.</p>
              <p>
                결제 금액의 5%인
                <Image src="/svg/won.svg" width="10" height="10" />
                {(+props.totalPrice * 0.05).toLocaleString()}이 마일리지로 적립.
              </p>
            </span>
          </label>
        )}
        {!isOffice && (
          <label className="custom-radio">
            <input
              type="radio"
              name="type"
              value="DEPOSIT"
              onClick={getSelectedPaymentTypeHandler}
            />
            <span className="radio-btn">
              <div>
                <Image src="/svg/checked.svg" width="25" height="25" />
              </div>
              <h3>후결제</h3>
              <i className="price">
                <Image src="/svg/won.svg" width="10" height="10" />
                {(+props.totalPrice * 0.2).toLocaleString()}
              </i>

              <p>이용 금액을 이용 완료 후 결제.</p>
              <b className="notice">※ 카카오페이는 후결제가 불가능합니다.</b>
              <p>
                이용 금액의 20%인
                <Image src="/svg/won.svg" width="10" height="10" />
                {(+props.totalPrice * 0.2).toLocaleString()}이 보증금으로 결제
                필요.
              </p>
            </span>
          </label>
        )}
        {isOffice && (
          <label className="custom-radio">
            <input
              type="radio"
              name="type"
              value="FULL_PAYMENT"
              onClick={getSelectedPaymentTypeHandler}
            />
            <span className="radio-btn">
              <div>
                <Image src="/svg/checked.svg" width="25" height="25" />
              </div>
              <h3>후정산</h3>
              <i className="price">
                <Image src="/svg/won.svg" width="10" height="10" />
                {(+props.totalPrice).toLocaleString()}
              </i>

              <p>이용 금액을 이용 완료 후 정산.</p>
              <b className="notice">※ 선결제는 지원하지 않습니다.</b>
            </span>
          </label>
        )}
      </div>
    </Wrapper>
  );
};

export default PaymentType;
