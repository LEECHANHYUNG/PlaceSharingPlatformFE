import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  color: #111;
  text-decoration: none;
  font-weight: 900;
  text-align: center;

  h1 {
    font-size: 30px;
    cursor: pointer;
  }
`;

const AuthHeader = () => {
  return (
    <StyledHeader href="/">
      <h1>Place Sharing Platform</h1>
    </StyledHeader>
  );
};

export default AuthHeader;
