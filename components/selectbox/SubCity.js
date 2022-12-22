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
  &:focus {
    outline: none;
  }
`;
const SubCity = () => {
  const [subCityList, setSubCityList] = useState([]);
  const subCityRef = useRef();
  const selectCityNumber = useSelector(
    (state) => state.selected.selectedCityNum
  );
  const dispatch = useDispatch();
  const selectSubCityHandler = (e) => {
    dispatch(selectedSliceActions.getSelectedSubCity(e.target.value));
    if (e.target.value !== '0') {
      e.target.parentNode.style.backgroundColor = '#6a9eff';
      e.target.style.backgroundColor = '#6a9eff';
    }
    if (e.target.value === '0') {
      e.target.parentNode.style.backgroundColor = '#fff';
      e.target.style.backgroundColor = '#fff';
    }
  };
  const getSubCityList = async () => {
    if (selectCityNumber === '0') {
      setSubCityList([]);
      return;
    }
    try {
      await fetch(
        `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${selectCityNumber}*000000`
      )
        .then((res) => {
          if (!res.ok) {
            return;
          }
          return res.json();
        })
        .then((data) => {
          setSubCityList(data.regcodes.slice(1));
        });
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    if (selectCityNumber !== '') {
      getSubCityList();
    }
    dispatch(selectedSliceActions.getSelectedSubCity('0'));

    subCityRef.current.style.backgroundColor = '#fff';
    subCityRef.current.parentNode.style.backgroundColor = '#fff';
  }, [selectCityNumber]);
  return (
    <Select onChange={selectSubCityHandler} ref={subCityRef}>
      <option value="0">시 군 구</option>
      {subCityList.map((elem) => (
        <option key={elem.code} value={elem.name.split(' ')[1]}>
          {elem.name.split(' ')[1]}
        </option>
      ))}
    </Select>
  );
};

export default SubCity;
