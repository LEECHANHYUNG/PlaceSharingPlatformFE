import React from 'react';
import styled from 'styled-components';
import Desk from './item/Desk';
import MeetingRoom from './item/MeetingRoom';
import Office from './item/Office';
const Wrapper = styled.section`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 50px;
  h1 {
    padding: 0 30px;
    font-size: 1rem;
    font-weight: 900;
  }
`;
const PlaceAvailableItem = ({ items }) => {
  return (
    <Wrapper>
      <h1>이용 가능 상품</h1>
      {items.DESK && <Desk price={items.DESK} />}
      {items.MEETINGROOM && <MeetingRoom price={items.MEETINGROOM} />}
      {items.OFFICE && <Office price={items.OFFICE} />}
    </Wrapper>
  );
};

export default PlaceAvailableItem;
