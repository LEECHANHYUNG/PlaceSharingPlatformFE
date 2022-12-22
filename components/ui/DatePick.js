import React, { useRef } from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { reservationActions } from '../../store/reservation';

const StyledDate = styled(DatePicker)`
  margin-top: 10px;
  width: 250px;
  height: 40px;
  text-align: center;
  font-size: 1.4rem;
`;

const DatePick = () => {
  const dispatch = useDispatch();
  const dateInputRef = useRef();
  const [selectDate, setSelectDate] = useState(new Date());
  const unableDateList = useSelector(
    (state) => state.reservation.unableDateList
  );
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const date = new Date().getDate();
  const changeDateHandler = (date) => {
    setSelectDate(date);
    dispatch(reservationActions.selectDate(date));
    dispatch(reservationActions.getSelectedEndTime(24));
    const selectedTimeList = document.getElementsByClassName('start-time');
    if (selectedTimeList[0]) {
      selectedTimeList[0].classList.remove('start-time');
    }
    dispatch(reservationActions.getSelectedStartTime(24));
  };
  return (
    <StyledDate
      selected={selectDate}
      minDate={new Date()}
      maxDate={new Date(year + 1, month, date - 1)}
      dateFormat="yyyy-MM-dd"
      ref={dateInputRef}
      onChange={changeDateHandler}
      excludeDates={unableDateList}
    />
  );
};

export default DatePick;
