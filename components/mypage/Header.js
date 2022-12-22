import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Header = (props) => {
  const { userName, mileagePoint, totalReviewNumber, joinDate } =
    props.userData;
  return (
    <Wrapper>
      <h1>My Page</h1>
      <div className="userInfo">
        <div className="left">
          <div className="userName">이름 : {userName}</div>
          <div>가입일 :{joinDate}</div>
        </div>
        <div className="right">
          <div className="mileage">
            <div>
              마일리지 <Image src="/svg/won.svg" width="18" height="18" />
            </div>
            <Link href="/mypage/mileage">
              <div className="userData">{mileagePoint.toLocaleString()}</div>
            </Link>
          </div>
          <div>
            <div>
              작성 리뷰 <Image src="/svg/pencil.svg" width="18" height="18" />
            </div>
            <Link href="/mypage/review">
              <div className="userData">{totalReviewNumber}</div>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  top: 80px;
  margin-top: 20px;
  height: 200px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: start;
  flex-direction: column;
  border-bottom: 2px solid #111;
  h1 {
    text-align: left;
    width: 100%;
    font-size: 3rem;
    padding-top: 20px;
    padding-left: 150px;
  }
  .userInfo {
    width: 100%;
    font-size: 20px;
    font-weight: 700;
  }
  .userInfo .left {
    padding-left: 150px;
    float: left;
    width: 50%;
    min-width: 150px;
    line-height: 50px;
  }
  .userInfo .right {
    float: right;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    min-width: 150px;
    line-height: 50px;
  }
  .userInfo .userData {
    font-size: 2rem;
    cursor: pointer;
  }
  @media screen and (max-width: 1170px) {
    height: auto;
    h1 {
      padding: 0px;
      text-align: left;
      padding-left: 10px;
      font-size: 30px;
    }
    .userInfo {
      font-size: 1rem;
    }
    .userInfo .left {
      width: 100%;
      padding: 10px 0;
      border-bottom: 1px solid #999;
      padding-left: 30px;
      line-height: 30px;
    }
    .userInfo .right {
      width: 100%;
      padding: 0 50px;
      display: flex;
      justify-content: space-between;
      align-items: start;
    }
  }
  @media screen and (max-width: 858px) {
    justify-content: space-between;
    .userInfo .right {
      width: 100%;
      padding: 0 10px;
    }

    .userInfo .right .mileage {
      width: 60%;
      border-right: 2px solid #999;
    }
  }
`;
export default Header;
