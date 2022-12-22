import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { paymentSliceActions } from '../../../store/payment';
import Button from '../../ui/Button';

const Wrapper = styled.section`
  .btn {
    display: flex;
    justify-content: space-around;
  }
  h4 {
    margin-left: 20px;
    margin-bottom: 20px;
  }
  button {
    width: 150px;
    background: #fff;
    border: 3px solid #111;
    color: #111;
  }
  button.selected {
    background: #6a9eff;
  }
`;
const PaymentCompany = () => {
  const dispatch = useDispatch();
  const selectPaymentCompanyHandler = (e) => {
    const selected = document.getElementsByClassName('selected');
    Array.from(selected).map((elem) => {
      elem.classList?.remove('selected');
    });
    e.target.classList.add('selected');
    dispatch(paymentSliceActions.getPaymentCompany(e.target.value));
  };
  return (
    <Wrapper>
      <h4>결제 수단 선택</h4>
      <div className="btn">
        <Button onClick={selectPaymentCompanyHandler} value="nicepay">
          신용카드
        </Button>
      </div>
    </Wrapper>
  );
};

export default PaymentCompany;
