import { Backdrop, CircularProgress } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import PlaceItemList from './PlaceItemList';
import PlaceSearch from './PlaceSearch';

const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 25vw;
  height: 100vh;
  background: #fff;
  overflow-y: scroll;
  padding-top: 100px;

  @media screen and (max-width: 1170px) {
    padding-top: 0px;
    top: 60vh;
    width: 100%;
    height: 40vh;
  }
`;

const PlaceList = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Wrapper>
      <PlaceSearch
        className="search"
        setIsLoading={(state) => setIsLoading(state)}
      />
      <PlaceItemList map={props.map} />
      {isLoading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default PlaceList;
