import React, { useEffect, useState } from 'react';
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

const City = () => {
  const dispatch = useDispatch();
  const [cityList, setCityList] = useState([]);
  useEffect(() => {
    const getCityList = async () => {
      try {
        await fetch(
          'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000'
        )
          .then((res) => {
            if (!res.ok) {
              return;
            }
            return res.json();
          })
          .then((data) => {
            setCityList(data.regcodes);
          });
      } catch (err) {
        return err;
      }
    };
    getCityList();
  }, []);
  const selectCity = (e) => {
    if (e.target.value.length > 1) {
      dispatch(
        selectedSliceActions.getSelectedCityNum(e.target.value.substring(0, 2))
      );
      dispatch(
        selectedSliceActions.getSelectedCity(e.target.value.substring(2))
      );
    } else {
      dispatch(selectedSliceActions.getSelectedCityNum('0'));
      dispatch(selectedSliceActions.getSelectedCity('0'));
    }

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
    <Select onChange={selectCity}>
      <option value="0">광역시도</option>
      {cityList.map((elem) => (
        <option
          key={elem.code}
          value={String(elem.code).substring(0, 2) + elem.name}
        >
          {elem.name}
        </option>
      ))}
    </Select>
  );
};

export default City;
