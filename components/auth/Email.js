import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { authSliceActions } from '../../store/auth';
import Button from '../ui/Button';
import Input from '../ui/Input';
const Wrapper = styled.div`
  width: 100%;
`;
const Email = (props) => {
  const dispatch = useDispatch();
  const [emailBlur, setEmailBlur] = useState(false);
  const [authNumberBlur, setAuthNumberBlur] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const emailInputRef = useRef();
  const authNumberInputRef = useRef();
  const emailIsValid = useSelector((state) => state.auth.emailIsValid);
  const authNumberIsValid = useSelector(
    (state) => state.auth.authNumberIsValid
  );
  const emailChangeHandler = (e) => {
    setIsMatched(false);

    dispatch(authSliceActions.getAuthNumberAuthenticated(false));
    setIsSended(false);
    dispatch(authSliceActions.getEmailValid(e.target.value));
  };
  const validateEmailHandler = (e) => {
    dispatch(authSliceActions.getEmailValid(e.target.value));
    setEmailBlur(true);
  };
  const authNumberChangeHandler = (e) => {
    setIsMatched(false);
    dispatch(authSliceActions.getAuthNumberValid(e.target.value));
  };
  const validateAuthNumerHandler = (e) => {
    dispatch(authSliceActions.getAuthNumberValid(e.target.value));
    setAuthNumberBlur(true);
  };

  const sendEmailHandler = async () => {
    const enteredEmail = emailInputRef.current.value;
    setIsSended(true);
    try {
      setIsSended(true);
      setIsLoading(true);
      const response = await axios({
        url: '/api/auth/emailauthentication',
        method: 'post',
        data: {
          url: 'auth/sendemail',
          email: enteredEmail,
        },
      });
      if (response.status === 200) {
        setIsSended(true);
        setIsLoading(false);
        alert('메일을 보냈습니다. 인증 번호를 확인해주세요');
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      setIsSended(false);
      setIsLoading(false);
      alert(error.response.data.split(' ').slice(1).join(' '));
      emailInputRef.current.value = '';
      dispatch(authSliceActions.getEmailValid(''));
    }
  };
  const authNumberHandler = async () => {
    const enteredAuthNumber = authNumberInputRef.current.value;
    try {
      setIsLoading(true);
      const response = await axios({
        url: '/api/auth/emailauthentication',
        method: 'post',
        data: {
          url: 'auth/verifying',
          email: emailInputRef.current.value,
          authNumber: enteredAuthNumber,
        },
      });
      if (response.status === 200) {
        setIsLoading(false);
        setIsMatched(true);
        dispatch(authSliceActions.getAuthNumberAuthenticated(true));
        alert('인증 완료');
      } else {
        setIsSended(false);
        return new Promise.reject(response.data);
      }
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data);
    }
  };
  return (
    <Wrapper>
      <div className="validity-comment">
        {!emailIsValid && emailBlur && '이메일 양식으로 입력 해주세요'}
      </div>
      <label htmlFor="email"></label>
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
      {emailIsValid && props.signUp && !isSended ? (
        <Button onClick={sendEmailHandler}>인증 메일 전송</Button>
      ) : (
        ''
      )}
      <div className="validity-comment">
        {!authNumberIsValid &&
          authNumberBlur &&
          isSended &&
          '인증 번호를 확인해주세요'}
      </div>
      {isSended && !isMatched ? (
        <Input
          type="text"
          name="emailAuthentication"
          placeholder="인증 번호 4자리 입력"
          onChange={authNumberChangeHandler}
          onBlur={validateAuthNumerHandler}
          className={`${authNumberIsValid === false ? ' invalid' : ''}`}
          ref={authNumberInputRef}
          maxLength={4}
        />
      ) : (
        ''
      )}
      {emailIsValid && props.signUp && isSended && !isMatched ? (
        <Button disabled={!authNumberIsValid} onClick={authNumberHandler}>
          인증 번호 확인
        </Button>
      ) : (
        ''
      )}
      {isLoading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default Email;
