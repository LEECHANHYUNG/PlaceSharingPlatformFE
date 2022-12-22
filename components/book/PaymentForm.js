import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../ui/Button';
import Card from '../ui/Card';
import PaymentCompany from './PaymentForm/PaymentCompany';

const StyledCard = styled(Card)`
  border: 3px solid #6a9eff;
  button {
    margin-top: 30px;
  }

  @media screen and (max-width: 1270px) {
    width: 90%;
  }
`;

const PaymentForm = ({ reservationId }) => {
  const useMileage = useSelector((state) => state.payment.useMileage);
  const amount = useSelector((state) => state.payment.amount);
  const company = useSelector((state) => state.payment.company);
  const payType = useSelector((state) => state.payment.paymentType);
  const session = useSession();
  const router = useRouter();
  const submitPaymentHandler = async () => {
    try {
      const response = await axios({
        url: '/api/reservation/payment',
        method: 'post',
        data: {
          reservationId,
          company,
          useMileage,
          payType,
          accessToken: session.data.user.accessToken,
        },
      });
      if (response.status === 200) {
        router.replace(response.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
    }
  };
  return (
    <StyledCard>
      <h1>결제</h1>
      <PaymentCompany />
      {company === 'kakaopay' ? (
        <Button onClick={submitPaymentHandler}>{amount}결제</Button>
      ) : (
        ''
      )}
    </StyledCard>
  );
};

export default PaymentForm;
