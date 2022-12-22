import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useDispatch } from 'react-redux';
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

  input {
    text-align: right;
    height: 30px;
    width: 120px;
    margin-left: 5px;
    font-size: 1.5rem;
  }
  @media screen and (max-width: 1280px) {
    width: 92%;
    margin-left: 22px;
  }
`;

const Mileage = ({ totalMileage, totalPrice }) => {
  const [enteredMileage, setEnteredMileage] = useState('');
  const dispatch = useDispatch();
  const inputMileageHandler = (e) => {
    if (isNaN(e.target.value)) {
      alert('숫자만 입력 가능합니다.');
      setEnteredMileage('');
    } else if (+e.target.value > +totalPrice) {
      alert('최대 사용 가능 마일리지를 초과했습니다.');
      setEnteredMileage('');
    } else if (+e.target.value > +totalMileage) {
      alert('최대 사용 가능 마일리지를 초과했습니다.');
      setEnteredMileage('');
    } else {
      setEnteredMileage(e.target.value);
    }
  };
  const useMileageHandler = () => {
    if (enteredMileage % 100 !== 0) {
      alert('마일리지는 100원단위 사용가능합니다.');
      setEnteredMileage(enteredMileage - (enteredMileage % 100));
    }

    dispatch(
      paymentSliceActions.getUseMileage(enteredMileage - (enteredMileage % 100))
    );
  };
  return (
    <Wrapper>
      <h1>마일리지</h1>
      <div className="container">
        <div className="price">
          <h4>보유 마일리지</h4>
          <p>
            <Image src="/svg/won.svg" width="10" height="10" />
            {totalMileage?.toLocaleString() || 0}
          </p>
        </div>
        <div className="price">
          <h5>사용 마일리지 입력</h5>
          <p>
            <Image src="/svg/won.svg" width="10" height="10" />
            <input
              type="number"
              min={0}
              step={100}
              onChange={inputMileageHandler}
              value={enteredMileage}
            />
          </p>
        </div>
      </div>
      <Button onClick={useMileageHandler}>마일리지 적용</Button>
    </Wrapper>
  );
};

export default Mileage;
