import axios from 'axios';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { authSliceActions } from '../../store/auth';
import Button from '../ui/Button';
import Input from '../ui/Input';
import NewPasswordInput from './NewPasswordInput';
const Wrapper = styled.section`
  & {
    position: relative;
    border: 2px solid #111;
    border-radius: 5px;
    margin-top: 30px;
    padding: 0 30px;
    width: 100%;
    height: 300px;
    padding-top: 30px;
  }

  & label {
    font-size: 1.1rem;
    font-weight: 600;
  }
  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const ChangePasswordForm = () => {
  const [phoneBlur, setPhoneBlur] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isPreCheck, setIsPreChecked] = useState(false);
  const phoneIsValid = useSelector((state) => state.auth.phoneIsValid);
  const emailIsValid = useSelector((state) => state.auth.emailIsValid);
  const dispatch = useDispatch();

  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const submitFormHandler = async (e) => {
    setIsPreChecked(false);
    const enteredEmail = emailInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    e.preventDefault();

    try {
      const response = await axios({
        url: '/api/auth/finduserinfo',
        method: 'post',
        data: {
          url: 'main/precheck',
          email: enteredEmail,
          tel: enteredPhone,
        },
      });
      if (response.status === 200) {
        setIsPreChecked(true);
        alert(response.data);
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const emailChangeHandler = () => {
    dispatch(authSliceActions.getEmailValid(emailInputRef.current.value));
    setFormIsValid(phoneIsValid && emailIsValid);
  };
  const validateEmailHandler = () => {
    dispatch(authSliceActions.getEmailValid(emailInputRef.current.value));
    setEmailBlur(true);
  };
  const phoneChangeHandler = () => {
    dispatch(authSliceActions.getPhoneValid(phoneInputRef.current.value));
    setFormIsValid(phoneIsValid && emailIsValid);
  };
  const validatePhoneHandler = () => {
    dispatch(authSliceActions.getPhoneValid(phoneInputRef.current.value));
    setPhoneBlur(true);
  };

  return (
    <Wrapper>
      <form onSubmit={submitFormHandler}>
        <div className="validity-comment">
          {!emailIsValid && emailBlur && '이메일 양식으로 입력 해주세요'}
        </div>
        <label htmlFor="email">이메일</label>
        <Input
          type="email"
          name="email"
          placeholder="아이디(이메일 형식)*"
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          className={`${emailIsValid === false ? ' invalid' : ''}`}
          ref={emailInputRef}
          required
        />
        <div className="validity-comment">
          {!phoneIsValid && phoneBlur && '번호를 입력해주세요'}
        </div>
        <label htmlFor="phone">전화번호</label>
        <Input
          type="number"
          name="phone"
          placeholder="전화번호*"
          onChange={phoneChangeHandler}
          onBlur={validatePhoneHandler}
          className={`${phoneIsValid === false ? ' invalid' : ''}`}
          maxLength="13"
          ref={phoneInputRef}
          required
        />
        <Button type="submit" disabled={!formIsValid}>
          비밀번호 찾기
        </Button>
      </form>
      {isPreCheck ? <NewPasswordInput /> : ''}
    </Wrapper>
  );
};

export default ChangePasswordForm;
