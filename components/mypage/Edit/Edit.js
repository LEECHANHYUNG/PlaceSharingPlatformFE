import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import Phone from '../../auth/Phone';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import Input from '../../ui/Input';
const StyledCard = styled(Card)`
border 1px solid #6a9eff;
margin-top : 100px;
`;
const Wrapper = styled.section`
  padding-top: 50px;
  h1 {
    font-size: 2rem;
  }
  .select {
    display: flex;
    width: 80%;
    align-items: start;
    justify-content: flex-start;
    flex-direction: column;
  }
  .select p {
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
  form {
    width: 50vw;
    margin: auto;
    dispaly: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  @media screen and (max-width: 858px) {
    width: 100%;
    .select {
      width: 100%;
      font-size: 12px;
    }
  }
`;
const Edit = ({ item }) => {
  const [phone, setPhone] = useState('');
  const jobRef = useRef();
  const deskRef = useRef();
  const meetingRoomRef = useRef();
  const officeRef = useRef();
  const getPhoneNumber = (value) => {
    setPhone(value);
  };
  const session = useSession();
  const router = useRouter();
  const submitEditHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: '/api/mypage/edit',
        method: 'post',
        data: {
          accessToken: session.data.user.accessToken,
          tel: phone || item.tel,
          job: jobRef.current.value || item.job,
          preferType: {
            desk: deskRef.current.checked,
            meetingroom: meetingRoomRef.current.checked,
            office: officeRef.current.checked,
          },
        },
      });
      if (response.status === 200) {
        alert(response.data);
        router.replace('/mypage');
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      alert(error.response.data.message.split(' ').slice(1).join(' '));
    }
  };
  return (
    <Wrapper>
      <h1>정보 수정</h1>
      <StyledCard>
        <form onSubmit={submitEditHandler}>
          <label htmlFor="phone">전화번호</label>
          <Phone getPhoneNumber={getPhoneNumber} placeholder={item.tel} />
          <label htmlFor="phone">직업</label>
          <Input ref={jobRef} placeholder={item.job} />
          <div className="select">
            <p>선호 공간 선택</p>
            <div className="selectBox">
              <label htmlFor="desk">
                <input type="checkbox" name="desk" ref={deskRef} />
                데스크
              </label>
              <label htmlFor="meeting">
                <input type="checkbox" name="meeting" ref={meetingRoomRef} />
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
          <Button type="submit">정보 수정</Button>
        </form>
      </StyledCard>
    </Wrapper>
  );
};

export default Edit;
