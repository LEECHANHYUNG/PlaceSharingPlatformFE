import React, { Fragment, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
const StyledDatePicker = styled(DatePicker)`
  width: 140px;
  height: 36px;
  border: none;
  &:focus {
    outline: none;
  }
`;
const Date = () => {
  const [startDate, setStartDate] = useState(Date.now);
  return (
    <StyledDatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      placeholderText="날짜 선택"
    />
  );
};
export default Date;
