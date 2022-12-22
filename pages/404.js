import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  background: #fff;
  padding-top: 10%;
  font-size: 2
    margin: 0;
  }
`;

const PageNotFound = () => {
  return (
    <Wrapper>
      <h1>404</h1>
      <h1>Not Found Page</h1>
    </Wrapper>
  );
};

export default PageNotFound;
