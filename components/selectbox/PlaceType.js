import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectedSliceActions } from '../../store/select';

const Select = styled.select`
  width: 90%;
  margin: auto;
  z-index: 1000;
  background: #fff;
  border: 0px;
  text-align-last: center;
  &:focus {
    outline: none;
  }
`;

const PlaceType = () => {
  const dispatch = useDispatch();
  const selectTypeHandler = (e) => {
    dispatch(selectedSliceActions.getSelectedType(e.target.value));
    if (e.target.value !== '0') {
      e.target.parentNode.style.backgroundColor = '#6a9eff';
      e.target.style.backgroundColor = '#6a9eff';
    }
    if (e.target.value === '0') {
      e.target.parentNode.style.backgroundColor = '#fff';
      e.target.style.backgroundColor = '#fff';
    }
  };
  return (
    <Select onChange={selectTypeHandler}>
      <option value="0">공간 타입</option>
      <option value="DESK">데스크</option>
      <option value="MEETINGROOM">회의실</option>
      <option value="OFFICE">사무실</option>
    </Select>
  );
};

export default PlaceType;
