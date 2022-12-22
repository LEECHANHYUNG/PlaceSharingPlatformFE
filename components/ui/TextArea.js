import { useSession } from 'next-auth/react';
import React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from './Button';

const Content = styled.textarea`
  &::-webkit-scrollbar {
    width: 0px;
  }
  width: 100%;
  height: 60px;

  padding: 15px;
  border-radius: 5px;
  outline: none;
  resize: none;
  margin-top: 10px;
  font-size: 1rem;
  border: 1px solid #111;
  max-height: 330px;
  @media screen and (max-width: 858px) {
    max-height: 84px;
  }
`;
const TextArea = ({
  placeholder,
  addCommentHandler,
  maxLength = 40,
  placeComment,
  newReview,
  isLoading,
}) => {
  const session = useSession();
  const [isEntered, setIsEntered] = useState(false);
  const changeHeightHandler = (e) => {
    if (!session.data) {
      alert('로그인이 필요한 서비스입니다.');
      setIsEntered((e.target.value = ''));
    }
    setIsEntered(e.target.value.length !== 0);

    e.target.style.height = `63px`;
    let scHeight = e.target.scrollHeight;
    e.target.style.height = `${scHeight}px`;
    if (e.target.value.length > maxLength) {
      alert(`최대 ${maxLength}자까지 입력 가능합니다.`);
      e.target.value = e.target.value.slice(0, maxLength);
    }
  };
  const submitCommentHandler = (e) => {
    setIsEntered(false);
    addCommentHandler(e);
  };
  return (
    <Fragment>
      <Content
        placeholder={
          !session.data ? '로그인이 필요한 서비스입니다.' : placeholder
        }
        maxLength={maxLength || null}
        onKeyUp={changeHeightHandler}
        required
      ></Content>
      {placeComment ? (
        <Button
          onClick={submitCommentHandler}
          disabled={!isEntered || !session.data}
        >
          등록
        </Button>
      ) : newReview ? (
        <Button onClick={addCommentHandler} disabled={!isEntered}>
          등록
        </Button>
      ) : (
        <Button
          onClick={addCommentHandler}
          disabled={!isEntered || !session.data || isLoading}
        >
          등록
        </Button>
      )}
    </Fragment>
  );
};

export default TextArea;
