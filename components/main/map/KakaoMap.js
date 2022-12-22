import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import ControlBox from './ControlBox';
import PlaceMarker from './PlaceMarker';
import FilterBanner from '../../layout/FilterBanner';
import styled from 'styled-components';
import FilterResetBtn from './FilterResetBtn';
import { Backdrop, CircularProgress } from '@mui/material';
const KaKaoMap = styled(Map)`
  position: absolute;
  padding-top: 154px;
  top: 0px;
  bottom: 0px;
  left: 0px;
  width: 75vw;
  height: 100vh;

  @media (max-width: 1170px) {
    width: 100%;
    top: 0px;
    height: 60vh;
  }
`;
const KakaoMap = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const mapRef = useRef();
  useEffect(() => {
    props.setMapHandler(mapRef);
  }, []);
  return (
    <Fragment>
      <FilterBanner setIsLoading={(state) => setIsLoading(state)} />
      <KaKaoMap
        id="map"
        center={{
          lat: 37.52341236919156,
          lng: 127.05462238047163,
        }}
        ref={mapRef}
      >
        <PlaceMarker map={mapRef} />
        <ControlBox map={mapRef} />
      </KaKaoMap>
      <FilterResetBtn />
      {isLoading ? (
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default KakaoMap;
