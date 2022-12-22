import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper';
const Wrapper = styled.section`
  position: relative;
  top: 30px;
  width: 60vw;
  height: 400px;
  text-align: center;
  margin: auto;
  padding-bottom: 60px;
  .left {
    float: left;
    position: relative;
    width: 50%;
    height: 100%;
    object-fit: contain;
    border: 6px solid transparent;
  }
  .left-img {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  .right {
    float: right;
    width: 50%;
    height: 100%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    display: flex;
    flex-wrap: wrap;
  }

  .right-item {
    position: relative;
    width: 50%;
    height: 50%;
    border-radius: 0;
    border: 6px solid transparent;
  }
  .right-item:nth-child(2) .right-img {
    border-top-right-radius: 20px;
  }
  .right-item:nth-child(4) .right-img {
    border-bottom-right-radius: 20px;
  }

  @media screen and (max-width: 1170px) {
    height: 300px;
    width: 90vw;
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  .swiper-slide {
    height: 360px;
  }
  @media screen and (max-width: 858px) {
    .swiper-slide {
      height: 250px;
    }
  }
`;
const PlaceMainImage = ({ images }) => {
  return (
    <Wrapper>
      <StyledSwiper navigation={true} modules={[Navigation]} draggable={false}>
        <SwiperSlide className="swiper-slide">
          <div className="left">
            <Image
              src={images[0] ? images[0] : '/image/default-image.gif'}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="left-img"
              priority
            />
          </div>
          <div className="right">
            <div className="right-item">
              <Image
                src={images[1] ? images[1] : '/image/default-image.gif'}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="right-img"
                priority
              />
            </div>
            <div className="right-item">
              <Image
                src={images[2] ? images[2] : '/image/default-image.gif'}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="right-img"
                priority
              />
            </div>
            <div className="right-item">
              <Image
                src={images[3] ? images[3] : '/image/default-image.gif'}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="right-img"
                priority
              />
            </div>
            <div className="right-item">
              <Image
                src={images[4] ? images[4] : '/image/default-image.gif'}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="right-img"
                priority
              />
            </div>
          </div>
        </SwiperSlide>
        {images.map((elem) => (
          <SwiperSlide key={elem}>
            <Image
              src={elem}
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              className="image"
              priority
            />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Wrapper>
  );
};

export default PlaceMainImage;
