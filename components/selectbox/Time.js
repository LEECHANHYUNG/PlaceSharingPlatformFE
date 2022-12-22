import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectedSliceActions } from '../../store/select';
const Select = styled.select`
  width: 90%;
  margin: auto;
  z-index: 1000;
  background: #fff;
  border: 0px;
  text-align-last: center;
  &::-webkit-scrollbar {
    display: none;
  }
  &::-moz-scrollbar {
    display: none;
  }
  &::-o-scrollbar {
    display: none;
  }
  &::-google-ms-scrollbar {
    display: none;
  }
  &::-khtml-scrollbar {
    display: none;
  }

  &:focus {
    outline: none;
  }
`;
const Time = (props) => {
  const dispatch = useDispatch();
  const endTimeRef = useRef();
  const startTime = useSelector((state) => state.selected.startTime);

  const startTimeHandler = (e) => {
    dispatch(selectedSliceActions.getStartTime(e.target.value));
    if (e.target.value !== '24') {
      e.target.parentNode.style.backgroundColor = '#6a9eff';
      e.target.style.backgroundColor = '#6a9eff';
    }
    if (e.target.value === '24') {
      e.target.parentNode.style.backgroundColor = '#fff';
      e.target.style.backgroundColor = '#fff';
    }
  };
  const endTimeHandler = (e) => {
    dispatch(selectedSliceActions.getEndTime(e.target.value));
    if (e.target.value !== '0') {
      e.target.parentNode.style.backgroundColor = '#6a9eff';
      e.target.style.backgroundColor = '#6a9eff';
    }
    if (e.target.value === '0') {
      e.target.parentNode.style.backgroundColor = '#fff';
      e.target.style.backgroundColor = '#fff';
    }
  };
  if (props.time === 'start') {
    return (
      <Select onChange={startTimeHandler}>
        <option value="24">시작 시간</option>
        {[...new Array(23)].map((elem, idx) => (
          <option value={idx + 1} key={idx}>
            {idx + 1}:00
          </option>
        ))}
      </Select>
    );
  }
  useEffect(() => {
    if (Number(startTime) > Number(endTimeRef.current.value)) {
      dispatch(selectedSliceActions.getEndTime('0'));

      endTimeRef.current.style.backgroundColor = '#fff';
      endTimeRef.current.parentNode.style.backgroundColor = '#fff';
    }
  }, [startTime]);
  return (
    <Select onChange={endTimeHandler} ref={endTimeRef}>
      <option key="0" value="0">
        종료 시간
      </option>
      {[...new Array(24 - Number(startTime))].map((elem, idx) => (
        <option value={Number(startTime) + idx} key={Number(startTime) + idx}>
          {Number(startTime) + idx}:00
        </option>
      ))}
    </Select>
  );
};

export default Time;
