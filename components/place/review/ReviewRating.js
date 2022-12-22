import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  .rating {
    position: relative;
  }
  .able {
    position: absolute;
    width: ${(props) => (props.score ? `${(+props.score / 5) * 80}px` : '0px')};
    overflow: hidden;
    z-index: 1;
    white-space: nowrap;
  }
  .disable {
    position: absolute;
    width: 80px;
    overflow: hidden;
  }
  .score {
    position: relative;
    left: 90px;
    font-size: 1rem;
    font-weight: 600;
  }
`;

const ReviewRating = ({ score }) => {
  return (
    <Wrapper score={score}>
      <div className="rating">
        <div className="able">
          <Image src="/svg/star.svg" width="16" height="16" />
          <Image src="/svg/star.svg" width="16" height="16" />
          <Image src="/svg/star.svg" width="16" height="16" />
          <Image src="/svg/star.svg" width="16" height="16" />
          <Image src="/svg/star.svg" width="16" height="16" />
        </div>
        <div className="disable">
          <Image src="/svg/graystar.svg" width="16" height="16" />
          <Image src="/svg/graystar.svg" width="16" height="16" />
          <Image src="/svg/graystar.svg" width="16" height="16" />
          <Image src="/svg/graystar.svg" width="16" height="16" />
          <Image src="/svg/graystar.svg" width="16" height="16" />
        </div>
      </div>
      <div className="score">{score}</div>
    </Wrapper>
  );
};

export default ReviewRating;
