import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { reservationActions } from '../../store/reservation';
import Button from '../ui/Button';

const Wrapper = styled.header`
  width: 90%;
  margin: auto;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
  border-bottom: 3px solid #6a9eff;
  border-top: 3px solid #6a9eff;
  & :nth-child(2) {
    margin: 0 20px;
  }
  @media screen and (max-width: 758px) {
    font-size: 0.8rem;
  }
`;

const ItemHeader = ({ items }) => {
  const [beforeClickedBtn, setBeforeClickedBtn] = useState(null);
  const dispatch = useDispatch();
  const selectTypeHandler = (e) => {
    if (beforeClickedBtn) {
      beforeClickedBtn.style.backgroundColor = '#6a9eff';
    }
    setBeforeClickedBtn(e.target);
    dispatch(reservationActions.getSelectedType(e.target.value));
    dispatch(reservationActions.getReservationItem(''));
    dispatch(reservationActions.getSelectedStartTime(24));
    dispatch(reservationActions.getSelectedEndTime(24));
    e.target.style.backgroundColor = 'rgb(91, 135, 218)';
  };
  return (
    <Wrapper>
      {items.desk.exist ? (
        <Button
          type="button"
          className="btn"
          main={true}
          onClick={selectTypeHandler}
          value="desk"
        >
          1인 데스크
        </Button>
      ) : (
        ''
      )}
      {items.meetingRoom.length ? (
        <Button
          type="button"
          className="btn"
          main={true}
          onClick={selectTypeHandler}
          value="meetingRoom"
        >
          회의실
        </Button>
      ) : (
        ''
      )}
      {items.office.length ? (
        <Button
          type="button"
          className="btn"
          main={true}
          onClick={selectTypeHandler}
          value="office"
        >
          사무실
        </Button>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default ItemHeader;
