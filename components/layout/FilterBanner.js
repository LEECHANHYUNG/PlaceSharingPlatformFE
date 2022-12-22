import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import City from '../selectbox/City';
import PlaceType from '../selectbox/PlaceType';
import SubCity from '../selectbox/SubCity';
import Time from '../selectbox/Time';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { officeSliceActions } from '../../store/officeList';

const StyledInput = styled.input`
  padding: 15px;
  border: none;
  outline: none;
  border-radius: 5px;

  &::webkit-calendar-picker-indicator {
    background: #6a9eff;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
  }
`;
const FilterBanner = ({ setIsLoading }) => {
  const buttonRef = useRef();
  const selectedStartTime = useSelector((state) => state.selected.startTime);
  const selectedEndTime = useSelector((state) => state.selected.endTime);
  const selectedCity = useSelector((state) => state.selected.selectedCity);
  const selectSubCity = useSelector((state) => state.selected.selectSubCity);
  const selectedType = useSelector((state) => state.selected.selectedType);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      selectedStartTime === '24' &&
      selectedEndTime === '0' &&
      selectedCity === '0' &&
      selectSubCity === '0' &&
      selectedType === '0'
    ) {
      buttonRef.current.style.backgroundColor = '#fff';
      buttonRef.current.disabled = true;
    } else {
      buttonRef.current.style.backgroundColor = '#6a9eff';
      buttonRef.current.disabled = false;
    }
  }, [
    selectedStartTime,
    selectedEndTime,
    selectedCity,
    selectSubCity,
    selectedType,
  ]);
  const sendSelectedFilter = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: '/api/main/filter',
        method: 'post',
        data: {
          day:
            inputDateRef.current.value ||
            new Date().toLocaleDateString().replace(/. /g, '-').slice(0, -1),
          startTime: selectedStartTime,
          endTime: selectedEndTime,
          city: selectedCity,
          subCity: selectSubCity,
          type: selectedType,
        },
      });
      if (response.status === 200) {
        setIsLoading(false);
        let officeList = [];
        for (const officeId in response.data) {
          officeList.push({
            key: response.data[officeId].placeId,
            item: response.data[officeId],
          });
        }
        dispatch(officeSliceActions.getFilteredPlaceList(officeList));
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const inputDateRef = useRef();
  return (
    <Wrapper>
      <main>
        <button
          onClick={sendSelectedFilter}
          ref={buttonRef}
          className="selectOption button"
        >
          조건 검색
        </button>

        <div className="selectOption ">
          <StyledInput
            type="date"
            ref={inputDateRef}
            min={new Date()
              .toLocaleDateString()
              .replace(/. /g, '-')
              .slice(0, -1)}
          />
        </div>
        <div className="selectOption ">
          <Time time="start" />
        </div>
        <div className="selectOption">
          <Time />
        </div>
        <div className="selectOption">
          <City />
        </div>
        <div className="selectOption ">
          <SubCity />
        </div>
        <div className="selectOption">
          <PlaceType />
        </div>
      </main>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  background: #fff;
  border: 2px solid #111;
  border-right: none;
  height: 54px;
  padding: 5px 10px;
  width: 75%;
  z-index: 10;
  -ms-overflow-style: none;
  overflow-y: hidden;
  & ::-webkit-scrollbar {
    display: none;
  }

  main {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 860px;
  }

  div {
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon {
    margin-left: 20px;
  }
  .selectOption {
    height: 36px;
    width: 140px;
    cursor: pointer;
  }
  .selectOption.button {
    margin-left: 20px;
    width: 100px;
  }

  @media screen and (max-width: 1170px) {
    top: 100px;
    position: fixed;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    width: 100%;
  }
`;

export default FilterBanner;
