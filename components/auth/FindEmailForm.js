import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../ui/Button';
import Name from './Name';
import Phone from './Phone';

const Wrapper = styled.section`
  border: 2px solid #111;
  border-radius: 5px;
  margin-top: 30px;
  padding: 0 30px;
  width: 100%;
  height: 300px;
  padding-top: 30px;

  label {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const FindEmailForm = () => {
  const [inputPhoneNumber, setInputPhoneNumber] = useState();
  const [inputName, setInputName] = useState();
  const getPhoneNumber = (item) => {
    setInputPhoneNumber(item);
  };
  const [email, setEmail] = useState('');
  const phoneIsValid = useSelector((state) => state.auth.phoneIsValid);
  const nameIsValid = useSelector((state) => state.auth.nameIsValid);
  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: '/api/auth/finduserinfo',
        method: 'post',
        data: {
          url: 'main/findemail',
          name: inputName,
          tel: inputPhoneNumber,
        },
      });
      if (response.status === 200) {
        setEmail(response.data.findUserMail);
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      setEmail('');
      alert(error.response.data.message);
    }
  };
  return (
    <Wrapper>
      <form onSubmit={submitFormHandler}>
        <label htmlFor="name">이름</label>
        <Name setInputName={setInputName} />
        <label htmlFor="phone">핸드폰 번호</label>
        <Phone getPhoneNumber={getPhoneNumber} />
        <Button type="submit" disabled={!nameIsValid || !phoneIsValid}>
          아이디 찾기
        </Button>
      </form>
      {email ? <div className="email">이메일 : {email}</div> : ''}
    </Wrapper>
  );
};

export default FindEmailForm;
