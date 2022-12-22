import React, { useState } from 'react';
import styled from 'styled-components';
const Header = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  li {
    width: 100%;
    border: 2px solid #111;
    border-radius: 3px;
    margin: 10px;
    cursor: pointer;
    height: 40px;
    font-weight: 700;
    text-align: center;
    line-height: 40px;
  }

  li:nth-child(1) {
    background: ${(props) =>
      props.selectedItem === 'email' ? '#6a9eff' : 'transparent'};
  }
  li:nth-child(2) {
    background: ${(props) =>
      props.selectedItem === 'password' ? '#6a9eff' : 'transparent'};
  }
  li:hover {
    background: #6a9eff;
  }
`;
const FindUserInfoNav = ({ getSelectedItem, selectedItem }) => {
  return (
    <Header selectedItem={selectedItem}>
      <li
        onClick={() => {
          getSelectedItem('email');
        }}
      >
        이메일 찾기
      </li>
      <li
        onClick={() => {
          getSelectedItem('password');
        }}
      >
        비밀번호 찾기
      </li>
    </Header>
  );
};

export default FindUserInfoNav;
