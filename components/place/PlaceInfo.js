import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.section`
  margin : auto;
  .place-name {
    font-size: 1.7rem;
    font-weight: 900;
    margin-top: 20px;
    margin-left: 20px;
  }
  .place-description {
    display : ${(props) => (props.main ? 'none' : 'block')};
    margin-top: 30px;
    padding: 0 30px;
    color: #888;
  }
  .place-address {
    font-size: 1rem;
    padding: ${(props) => (props.main ? '10px' : '30px')} 30px;
  }
  .line {
    height: 6px;
    background #999;
  }
  .review-avg{
    position: relative;
    width : 80px;
    left : 20px;
    display: flex;
    margin-right : 10px;
  }
  .review-avg div{
    font-weight: 900;
    font-size : 0.9rem;
  }
  .review{
    padding-top : 20px;
    display : flex;
    justify-content: flex-start;
    align-items : center
    
  }
  .review-count{
    margin-left: 20px;
    font-size : 0.9rem;
    text-decoration: underline;
  }
`;
const PlaceInfo = ({
  placeName,
  description,
  address,
  rating,
  review,
  main,
}) => {
  return (
    <Wrapper main={main}>
      <div className="review">
        <div className="review-avg">
          <Image src="/svg/star.svg" width="16" height="16" />
          <div>{`${rating}/5.0`}</div>
        </div>

        {!main ? (
          ''
        ) : (
          <a href="#review" className="review-count">
            리뷰 {review}개
          </a>
        )}
      </div>
      <div className="place-name">{placeName}</div>
      <div className="place-description">{description}</div>
      <div className="place-address">{address}</div>
      <div className="line"></div>
    </Wrapper>
  );
};

export default PlaceInfo;
