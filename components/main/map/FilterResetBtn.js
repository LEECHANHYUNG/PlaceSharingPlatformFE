import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { officeSliceActions } from '../../../store/officeList';

const Button = styled.button`
  background: #6a9eff;
  width: 150px;
  height: 30px;
  border-radius: 6px;
  position: absolute;
  top: 194px;
  left: 37.5%;
  transform: translateX(-37.5%);
  z-index: 10;
  cursor: pointer;
  font-weight: 900;
  font-size: 1rem;

  @media screen and (max-width: 1170px) {
    left: 50%;
    transform: translateX(-50%);
    top: 180px;
  }
`;

const FilterResetBtn = () => {
  const dispatch = useDispatch();
  const filterResetHandler = () => {
    dispatch(officeSliceActions.resetFilteredPlaceList());
  };
  const isFiltered = useSelector((state) => state.officeList.isFiltered);
  return isFiltered ? (
    <Button onClick={filterResetHandler}>필터 초기화</Button>
  ) : (
    ''
  );
};

export default FilterResetBtn;
