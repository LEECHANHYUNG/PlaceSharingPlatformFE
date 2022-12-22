import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import styled from 'styled-components';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { officeSliceActions } from '../../store/officeList';
import { useRouter } from 'next/router';
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100px;
  width: 100%;
  background-color: #252424;
  z-index: 10000;

  .logo {
    float: left;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 50px;
  }
  .logo h1 {
    color: #fff;
    margin-left: 30px;
  }
  ul {
    line-height: 100px;
    float: right;
    margin-right: 50px;
    z-index: auto;
  }
  ul li {
    color: #fff;
    display: inline-block;
    line-height: 80px;
    margin: 0 5px;
    cursor: pointer;
  }
  .checkbtn {
    font-size: 30px;
    float: right;
    line-height: 80px;
    margin-right: 40px;
    cursor: pointer;
    display: none;
    line-height: 100px;
  }
  #check {
    display: none;
  }
  @media screen and (max-width: 1170px) {
    ul li a {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 858px) {
    .checkbtn {
      display: block;
    }

    ul {
      position: fixed;
      width: 100vw;
      height: 100vh;
      background: #2c3e50;
      left: -110%;
      top: 100px;
      text-align: center;
      transition: all 0.5s;
    }
    ul li {
      display: block;
      margin: 50px 0;
      line-height: 19px;
    }

    #check:checked + label ~ ul {
      left: 0;
    }
  }
`;

const MainHeader = () => {
  const router = useRouter();
  const [isAunthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [status]);

  const signOutHandler = () => {
    signOut({ redirect: false });
    router.replace('/auth/signin');
  };
  const removeMenuBar = () => {
    const checkbox = document.getElementById('check');
    checkbox.checked = false;
  };
  return (
    <Nav>
      <Link href="/" className="link">
        <a
          onClick={() => dispatch(officeSliceActions.resetFilteredPlaceList())}
        >
          <div className="logo">
            <Image src="/svg/logo.svg" width="40" height="40" />
            <h1>Place Sharing Platform</h1>
          </div>
        </a>
      </Link>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <Image src="/svg/bars3.svg" width="35" height="35" />
      </label>
      <ul>
        {!isAunthenticated && (
          <li onClick={removeMenuBar}>
            <Link href="/auth/signin" className="link">
              로그인
            </Link>
          </li>
        )}
        {isAunthenticated && (
          <li onClick={signOutHandler} className="link">
            로그아웃
          </li>
        )}

        {!isAunthenticated && (
          <li onClick={removeMenuBar}>
            <Link href="/auth/signup" className="link">
              회원가입
            </Link>
          </li>
        )}
        {isAunthenticated && (
          <li onClick={removeMenuBar}>
            <Link href="/mypage" className="link">
              마이페이지
            </Link>
          </li>
        )}
      </ul>
    </Nav>
  );
};

export default MainHeader;
