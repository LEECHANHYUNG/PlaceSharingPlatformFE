import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  margin-top: 30px;
  padding-bottom: ${(props) => (props.main ? '30px' : 'none')};
  border-bottom: ${(props) => (props.main ? '3px solid #999' : 'none')};
  h1 {
    font-size: ${(props) => (props.main ? '1.5rem' : '1rem')};
    padding: 0 ${(props) => (props.main ? '0' : '30px')};
  }
  main {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    padding: 30px 30px;
    min-width: 300px;
  }
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 80px;
  }
  @media screen and (max-width: 1420px) {
    .item {
      padding-right: 30px;
    }
    .item p {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
  }
`;

const PlaceAdditional = ({ additionalItem, main }) => {
  return (
    <Wrapper main={main}>
      <h1>부가 정보</h1>
      <main>
        {additionalItem.includes('Parking') && (
          <div className="item">
            <Image src="/svg/car.svg" width="36" height="36" />
            <p>주차 가능</p>
          </div>
        )}
        {additionalItem.includes('Wifi') && (
          <div className="item">
            <Image src="/svg/wifi.svg" width="36" height="36" />
            <p>와이파이</p>
          </div>
        )}
        {additionalItem.includes('Coffee') && (
          <div className="item">
            <Image src="/svg/coffee.svg" width="36" height="36" />
            <p>커피 머신</p>
          </div>
        )}
        {additionalItem.includes('Monitor') && (
          <div className="item">
            <Image src="/svg/monitor.svg" width="36" height="36" />
            <p>모니터</p>
          </div>
        )}
      </main>
      {main ? '' : <div className="line"></div>}
    </Wrapper>
  );
};

export default PlaceAdditional;
