import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PlaceItem from './PlaceItem';

const OfficeCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding-top: 58px;
  .count {
    display: inline-block;
    color: #6a9eff;
    font-weight: 700;
  }
  @media screen and (max-width: 1170px) {
    padding-top: 62px;
    height: 85px;
  }
`;
const PlaceItemList = (props) => {
  const officeList = useSelector((state) => state.officeList.filteredPlaceList);

  return (
    <Fragment>
      <OfficeCount>
        <p className="count">{officeList?.length}</p>개의 place가 있습니다.
      </OfficeCount>
      {officeList?.map((elem) => {
        return <PlaceItem key={elem.key} elem={elem} map={props.map} />;
      })}
    </Fragment>
  );
};

export default PlaceItemList;
