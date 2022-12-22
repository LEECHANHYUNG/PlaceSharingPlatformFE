import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { authSliceActions } from '../../store/auth';
import Input from '../ui/Input';
const Wrapper = styled.div`
  width: 100%;
  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const Phone = ({ getPhoneNumber, placeholder }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneBlur, setPhoneBlur] = useState(false);
  const dispatch = useDispatch();
  const phoneIsValid = useSelector((state) => state.auth.phoneIsValid);
  const phoneChangeHandler = (e) => {
    setPhoneNumber(e.target.value.slice(0, 11));
    dispatch(authSliceActions.getPhoneValid(e.target.value));
  };
  const validatePhoneHandler = (e) => {
    if (getPhoneNumber) {
      getPhoneNumber(e.target.value);
    }
    dispatch(authSliceActions.getPhoneValid(e.target.value));
    setPhoneBlur(true);
  };
  return (
    <Wrapper>
      <div className="validity-comment">
        {!phoneIsValid && phoneBlur && '번호를 입력해주세요'}
      </div>
      <label htmlFor="phone"></label>
      <Input
        type="number"
        name="phone"
        placeholder={placeholder || '전화번호*'}
        onChange={phoneChangeHandler}
        onBlur={validatePhoneHandler}
        className={`${phoneIsValid === false ? ' invalid' : ''}`}
        value={phoneNumber}
        required
      />
    </Wrapper>
  );
};

export default Phone;
