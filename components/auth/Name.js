import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { authSliceActions } from '../../store/auth';
import Input from '../ui/Input';
const Wrapper = styled.div`
  &.control {
    width: 100%;
  }
`;
const Name = ({ setInputName }) => {
  const [nameBlur, setNameBlur] = useState(false);
  const dispatch = useDispatch();
  const nameIsValid = useSelector((state) => state.auth.nameIsValid);
  const nameChangeHandler = (e) => {
    if (setInputName) {
      setInputName(e.target.value);
    }
    dispatch(authSliceActions.getNameValid(e.target.value));
  };
  const validateNameHandler = (e) => {
    if (setInputName) {
      setInputName(e.target.value);
    }
    dispatch(authSliceActions.getNameValid(e.target.value));
    setNameBlur(true);
  };
  return (
    <Wrapper className="control">
      <div className="validity-comment">
        {!nameIsValid && nameBlur && '이름을 입력해주세요'}
      </div>
      <label htmlFor="name">
        <Input
          type="text"
          name="name"
          placeholder="이름*"
          onChange={nameChangeHandler}
          onBlur={validateNameHandler}
          className={`${nameIsValid === false ? ' invalid' : ''}`}
          minLength="2"
          maxLength="4"
          required
        />
      </label>
    </Wrapper>
  );
};

export default Name;
