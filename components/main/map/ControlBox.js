import styled from 'styled-components';
import Image from 'next/image';

const ControlDiv = styled.div`
  border: 1px solid #111;
  border-radius: 5px;
  position: absolute;
  top: 180px;
  left: 30px;
  width: 36px;
  height: 108px;
  overflow: hidden;
  z-index: 2;
  background-color: #f5f5f5;

  span {
    display: block;
    width: 36px;
    height: 36px;
    text-align: center;
    cursor: pointer;
    padding-top: 8px;
  }

  span:first-child,
  span:nth-child(2) {
    border-bottom: 1px solid #111;
  }
  @media screen and (max-width: 1170px) {
    top: 180px;
  }
`;

const ControlBox = (props) => {
  const zoomIn = () => {
    props.map.current.setLevel(props.map.current.getLevel() - 1);
  };

  const zoomOut = () => {
    props.map.current.setLevel(props.map.current.getLevel() + 1);
  };

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude,
          lng = position.coords.longitude;
        const currentLocation = new kakao.maps.LatLng(lat, lng);
        props.map.current.setLevel(5);
        props.map.current.panTo(currentLocation);
      });
    }
  };

  return (
    <ControlDiv>
      <span onClick={zoomIn}>
        <div className="icon">
          <Image src="/svg/plus.svg" width="14" height="14" />
        </div>
      </span>
      <span onClick={zoomOut}>
        <div className="icon">
          <Image src="/svg/minus.svg" width="14" height="14" className="icon" />
        </div>
      </span>
      <span onClick={getCurrentLocation}>
        <div className="icon">
          <Image src="/svg/gps.svg" width="14" height="14" className="icon" />
        </div>
      </span>
    </ControlDiv>
  );
};

export default ControlBox;
