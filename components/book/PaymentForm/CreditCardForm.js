import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
const StyledCard = styled(Card)`
  border: 3px solid #6a9eff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  h1 {
    text-align: center;
  }
  .second-row {
    display: flex;
    justify-content: space-between;
  }
  .third-row {
    margin-bottom: 20px;
  }
  .second-row input {
    width: 100px;
  }

  .input-field {
    border: 1px solid #999;
  }
  .input-field input {
    border: none;
    outline: none;
    padding: 10px;
  }
  .selection {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .selection select {
    padding: 10px;
    width: 100px;
    margin-right: 20px;
  }
  .card-number {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-number .input-field input {
    width: 70px;
    font-size: 20px;
  }
  .card-number .dash {
    font-weight: 700;
  }
  .pw .input-field {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pw-back {
    font-size: 11px;
    line-height: 30px;
    height: 30px;
  }
  .pw .input-field input {
    width: 25px;
    font-size: 37px;
    padding: 0;
  }
`;
const CreditCardForm = () => {
  const date = new Date();
  const router = useRouter();
  const cardFirstRef = useRef();
  const cardSecondRef = useRef();
  const cardThirdRef = useRef();
  const cardFourthRef = useRef();
  const birthRef = useRef();
  const passwordRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const reservationInfo = useSelector(
    (state) => state.reservation.reservationInfo
  );
  const company = useSelector((state) => state.payment.company);
  const paymentType = useSelector((state) => state.payment.paymentType);
  const useMileage = useSelector((state) => state.payment.useMileage);
  const session = useSession();
  const isOffice = reservationInfo.productType.includes('사무실');
  const submitPaymentHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: '/api/reservation/payment',
        method: 'post',
        data: {
          accessToken: session.data.user.accessToken,
          company,
          reservationId: reservationInfo.reservationId,
          card_number: `${cardFirstRef.current.value}-${cardSecondRef.current.value}-${cardThirdRef.current.value}-${cardFourthRef.current.value}`,
          expiry: `${yearRef.current.value}-${monthRef.current.value}`,
          birth: `${birthRef.current.value}`,
          pwd_2digit: `${passwordRef.current.value}`,
          payType: paymentType,
          payMileage: +useMileage,
          payWay: isOffice ? 'POSTPAYMENT' : 'PREPAYMENT',
        },
      });
      if (response.status === 200) {
        router.replace(`/mypage/reservation/${reservationInfo.reservationId}`);
      } else {
        setIsLoading(false);
        throw new Error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };
  const inputCardNumberHandler = (e) => {
    if (isNaN(e.target.value)) {
      e.target.value = '';
      return;
    }
  };
  return (
    <StyledCard>
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
      <h3>카드 정보 입력</h3>
      <div className="first-row">
        <h5>카드 번호</h5>
        <div className="card-number">
          <div className="input-field">
            <input
              type="text"
              maxLength={4}
              onKeyUp={inputCardNumberHandler}
              ref={cardFirstRef}
            />
          </div>
          <div className="dash">-</div>
          <div className="input-field">
            <input
              type="password"
              maxLength={4}
              onKeyUp={inputCardNumberHandler}
              ref={cardSecondRef}
            />
          </div>
          <div className="dash">-</div>
          <div className="input-field">
            <input
              type="password"
              maxLength={4}
              onKeyUp={inputCardNumberHandler}
              ref={cardThirdRef}
            />
          </div>
          <div className="dash">-</div>
          <div className="input-field">
            <input
              type="text"
              maxLength={4}
              onKeyUp={inputCardNumberHandler}
              ref={cardFourthRef}
            />
          </div>
        </div>
      </div>
      <div className="second-row">
        <div className="birth">
          <h5>생년월일</h5>
          <div className="input-field">
            <input type="number" maxLength={6} ref={birthRef} />
          </div>
        </div>
        <div className="pw">
          <h5>비밀번호</h5>
          <div className="input-field">
            <input type="password" maxLength={2} ref={passwordRef} />
            <div className="pw-back">{'●●'}</div>
          </div>
        </div>
      </div>
      <div className="third-row">
        <h5>유효기간</h5>
        <div className="selection">
          <select name="months" id="months" ref={monthRef}>
            <option value="01">1</option>
            <option value="02">2</option>
            <option value="03">3</option>
            <option value="04">4</option>
            <option value="05">5</option>
            <option value="06">6</option>
            <option value="07">7</option>
            <option value="08">8</option>
            <option value="09">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select name="years" id="years" ref={yearRef}>
            <option value={date.getFullYear()}>{date.getFullYear()}</option>
            <option value={date.getFullYear() + 1}>
              {date.getFullYear() + 1}
            </option>
            <option value={date.getFullYear() + 2}>
              {date.getFullYear() + 2}
            </option>
            <option value={date.getFullYear() + 3}>
              {date.getFullYear() + 3}
            </option>
            <option value={date.getFullYear() + 4}>
              {date.getFullYear() + 4}
            </option>
            <option value={date.getFullYear() + 5}>
              {date.getFullYear() + 5}
            </option>
            <option value={date.getFullYear() + 6}>
              {date.getFullYear() + 6}
            </option>
            <option value={date.getFullYear() + 7}>
              {date.getFullYear() + 7}
            </option>
          </select>
        </div>
      </div>
      <Button onClick={submitPaymentHandler} disabled={isLoading}>
        결제
      </Button>
    </StyledCard>
  );
};

export default CreditCardForm;
