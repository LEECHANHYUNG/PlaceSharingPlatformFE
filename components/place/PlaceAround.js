import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
const Wrapper = styled.section`
  min-height: 600px;
  width: 100%;
  margin-top: 30px;
  border-bottom: 3px solid #999;
  h1 {
    font-size: 1.5rem;
  }
  ul {
    margin-top: 20px;
    font-size: 1.2rem;
    font-weight: 900;
    display: flex;
    justify-content: space-between;
  }
  ul li {
    height: 30px;
    line-height: 30px;
    width: 25%;
    text-align: center;
    border: 1px solid #111;
    margin: 0 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  ul li:hover {
    border: 4px solid #6a9eff;
  }
  ul li.active {
    background: #6a9eff;
  }
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    border-top: 3px solid #111;
    border-bottom: 3px solid #111;
  }
  .data {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 80px;
  }
  .data > div {
    text-align: left;
    margin: auto;
  }
  header > div {
    width: 15%;
  }
  .name {
    width: 25%;
  }
  .address {
    width: 40%;
  }
  .tel {
    width: 20%;
  }
  .distance {
    width: 10%;
    color: #6a9eff;
    font-weight: 700;
  }
  .error {
    text-align: center;
    line-height: 58px;
  }
  @media screen and (max-width: 758px) {
    li {
      font-size: 0.9rem;
    }
    .data,
    header {
      font-size: 0.8rem;
    }
  }
`;
const PlaceAround = ({ placeSubInfo }) => {
  const [selectedItem, setSelectedItem] = useState(
    placeSubInfo.conveniencestoreData
  );
  const selectedItemHandler = (e) => {
    const active = document.getElementsByClassName('active');
    Array.from(active).map((elem) => elem.classList.remove('active'));
    setSelectedItem(placeSubInfo[e.target.childNodes[0].value]);
  };
  return (
    <Wrapper>
      <h1>주변 정보</h1>
      <nav>
        <ul>
          <li className="active" onClick={selectedItemHandler}>
            <input type="hidden" value={'conveniencestoreData'} />
            편의점
          </li>
          <li onClick={selectedItemHandler}>
            <input type="hidden" value={'cafeData'} />
            카페
          </li>
          <li onClick={selectedItemHandler}>
            <input type="hidden" value={'restaurantData'} />
            식당
          </li>
          <li onClick={selectedItemHandler}>
            <input type="hidden" value={'subwaystationData'} />
            지하철
          </li>
        </ul>
      </nav>
      <main>
        <header>
          <div className="name">상호명</div>
          <div className="address">주소</div>
          <div className="tel">전화번호</div>
          <div className="distance">거리</div>
        </header>
        {selectedItem ? (
          Object.keys(selectedItem).map((elem) => (
            <div className="data" key={elem}>
              <div className="name">{selectedItem[elem].storeName || '-'}</div>
              <div className="address">
                {selectedItem[elem].storeAddress || '-'}
              </div>
              <div className="tel">{selectedItem[elem].storeTel || '-'}</div>
              <div className="distance">
                {selectedItem[elem].distance || '-'}m
              </div>
            </div>
          ))
        ) : (
          <div className="error">
            {placeSubInfo.NoSuchData.PlaceCoordinateError}
          </div>
        )}
      </main>
    </Wrapper>
  );
};

export default PlaceAround;
