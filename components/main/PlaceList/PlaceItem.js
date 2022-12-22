import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { officeSliceActions } from '../../../store/officeList';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  padding: 10px 10px;
  line-height: 30px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding-bottom: 40px;
  text-decoration: none;
  color: #111;
  list-style: none;
  .container {
    width: 100%;
  }
  .name {
    font-weight: 900;
    font-size: 20px;
    line-height: 50px;
  }
  .address {
    font-size: 15px;
    line-height: 18px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .option {
    font-size: 14px;
    color: #999;
  }

  .line {
    position: absolute;
    width: 90%;
    border-bottom: 2px solid #6a9eff;
    bottom: 20px;
  }
`;

const PlaceItem = (props) => {
  const dispatch = useDispatch();
  const selectedOfficeRef = useRef();
  const officeList = useSelector((state) => state.officeList.officeList);

  const selectPlace = () => {
    const selectedPlaceId = selectedOfficeRef.current.id;
    dispatch(officeSliceActions.selectPlace(selectedPlaceId));
    const selectedPlace = officeList.filter(
      (elem) => elem.key === selectedPlaceId
    );
    const selectedPlaceAddress = selectedPlace[0].item.address;
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(selectedPlaceAddress, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        props.map.current?.setLevel(3);
        props.map.current?.panTo(coords);
      }
    });
  };
  return (
    <Wrapper>
      <div onClick={selectPlace} className="container">
        <div id={props.elem.key} ref={selectedOfficeRef}>
          <div className="name">{props.elem.item.placeName}</div>
          <div className="address">{props.elem.item.address}</div>
          <div className="option">
            {props.elem.item.placeDescription.slice(0, 50)}
          </div>
        </div>
        <div className="line"></div>
      </div>
    </Wrapper>
  );
};

export default PlaceItem;
