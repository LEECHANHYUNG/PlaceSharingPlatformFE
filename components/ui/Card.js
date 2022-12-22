import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 1rem auto;
  border-radius: 6px;
  background-color: white;
  padding: 1rem;
  width: 90%;
  max-width: 80rem;
  &.current-reservation-data {
    border: 4px solid #6a9eff;
    width: 70%;
  }
  @media screen and (max-width: 1170px) {
    width: 80%;
  }
  @media screen and (max-width: 858px) {
    &.current-reservation-data {
      width: 70%;
    }
  }
`;

const Card = (props) => {
  return (
    <Wrapper className={`${props.className ? props.className : ''}`}>
      {props.children}
    </Wrapper>
  );
};

export default Card;
