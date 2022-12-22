import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Email from '../../components/auth/Email';
import Name from '../../components/auth/Name';
import Password from '../../components/auth/Password';
import Phone from '../../components/auth/Phone';
import Button from '../../components/ui/Button';
import { authSliceActions } from '../../store/auth';
import axios from 'axios';
import AuthHeader from '../../components/ui/AuthHeader';
import Head from 'next/head';
import { Backdrop, CircularProgress } from '@mui/material';

const SignUp = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const emailIsValid = useSelector((state) => state.auth.emailIsValid);
  const passwordIsValid = useSelector((state) => state.auth.passwordIsValid);
  const nameIsValid = useSelector((state) => state.auth.nameIsValid);
  const phoneIsValid = useSelector((state) => state.auth.phoneIsValid);
  const passwordIsEqual = useSelector((state) => state.auth.passwordIsEqual);
  const authNumberIsValid = useSelector(
    (state) => state.auth.authNumberIsValid
  );
  const authNumberAuthenticated = useSelector(
    (state) => state.auth.authNumberAuthenticated
  );
  const enteredEmail = useSelector((state) => state.auth.enteredEmail);
  const enteredPassword = useSelector((state) => state.auth.enteredPassword);
  const checkedPassword = useSelector((state) => state.auth.checkedPassword);
  const enteredName = useSelector((state) => state.auth.enteredName);
  const enteredPhone = useSelector((state) => state.auth.enteredPhone);
  const jobRef = useRef();
  const deskRef = useRef();
  const meetingRoomRef = useRef();
  const officeRef = useRef();
  const disatch = useDispatch();
  useEffect(() => {
    disatch(authSliceActions.resetValidation());
  }, []);
  useEffect(() => {
    const validityChecker = setTimeout(() => {
      setFormIsValid(
        emailIsValid &&
          passwordIsValid &&
          nameIsValid &&
          phoneIsValid &&
          authNumberIsValid &&
          authNumberAuthenticated &&
          passwordIsEqual
      );
    }, 100);
    return () => {
      clearTimeout(validityChecker);
    };
  }, [
    emailIsValid,
    passwordIsValid,
    nameIsValid,
    phoneIsValid,
    authNumberIsValid,
    authNumberAuthenticated,
    passwordIsEqual,
  ]);
  const signupHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios({
      method: 'post',
      url: '/api/auth/signup',
      headers: { 'Content-Type': 'application/json' },
      data: {
        email: enteredEmail,
        password: enteredPassword,
        checkedPassword,
        name: enteredName,
        phoneNumber: enteredPhone,
        job: jobRef.current.value,
        preferType: [
          {
            desk: deskRef.current.checked,
            meetingRoom: meetingRoomRef.current.checked,
            office: officeRef.current.checked,
          },
        ],
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);

          alert(response.data.message);
          router.replace('/auth/signin');
        } else if (response.status === 400) {
          throw new Error(response.data.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data.split(' ').slice(1).join(' '));
      });
  };
  return (
    <Wrapper>
      <Head>
        <title>Place Sharing - 회원가입</title>
        <meta name="description" content={`공간 대여 플랫폼, 회원가입`} />
      </Head>
      <header>
        <AuthHeader />
      </header>
      <section className="signInForm">
        <form onSubmit={signupHandler}>
          <Email signUp={true} />
          <Password />
          <Name />
          <Phone />
          <input type="text" name="job" placeholder="직업" ref={jobRef} />
          <div className="select">
            <div className="place-select">선호 공간 선택</div>
            <div className="selectBox">
              <label htmlFor="desk">
                <input type="checkbox" name="desk" value="true" ref={deskRef} />
                데스크
              </label>
              <label htmlFor="meeting">
                <input
                  type="checkbox"
                  name="meeting"
                  value="true"
                  ref={meetingRoomRef}
                />
                회의실
              </label>
              <label htmlFor="office">
                <input
                  type="checkbox"
                  name="office"
                  value="true"
                  ref={officeRef}
                />
                오피스
              </label>
            </div>
          </div>
          <Button type="submit" disabled={!formIsValid}>
            회원가입
          </Button>
          <div className="login-btn">
            계정이 있으신가요?
            <Link href="/auth/signin">
              <div className="login-link">로그인</div>
            </Link>
          </div>
        </form>
      </section>
      {isLoading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default SignUp;
const Wrapper = styled.div`
  position: relative;
  top: 20vh;
  margin: 0 auto;
  border-radius: 6px;
  background-color: white;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  text-align: center;
  .login-link {
    cursor: pointer;
    display: inline-block;
    text-decoration: underline;
  }
  .signInForm form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .control {
    width: 100%;
  }
  .control.invalid input {
    border-color: red;
    background: #fbdada;
  }
  .control.invalid input:focus {
    outline: none;
    border-color: #4f005f;
    background: #f6dbfc;
  }
  .signInForm form input {
    width: 80%;
    height: 40px;
    margin: 10px auto;
  }
  button {
    width: 80%;
    margin-top: 20px;
  }
  .navLink {
    text-align: center;
  }
  .validity-comment {
    text-align: left;
    margin-left: 60px;
    position: relative;
    top: 0px;
    left: 0px;
  }
  .select {
    display: flex;
    width: 80%;
    align-items: start;
    justify-content: flex-start;
    flex-direction: column;
  }
  .select .login-btn,
  .select .place-select {
    margin: 0;
  }
  .select .selectBox {
    display: flex;
    align-self: start;
    width: 15px;
    width: 100%;
  }
  .select .selectBox input {
    width: 15px;
    height: 15px;
    margin: 0 5px;
  }
  @media screen and (max-width: 858px) {
    .validity-comment {
      margin-left: 24px;
      font-size: 13px;
    }
    label {
      font-size: 13px;
    }
    h1 {
      font-size: 22px;
    }
  }
`;
