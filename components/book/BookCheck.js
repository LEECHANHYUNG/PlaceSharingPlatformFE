import React from 'react';
import styled from 'styled-components';
import Card from '../ui/Card';
const StyledCard = styled(Card)`
  border: 4px solid #6a9eff;
  .banner {
    font-size: 1.2rem;
    font-weight: 900;
    margin-bottom: 10px;
  }
  .description {
    font-size: 0.9rem;
  }
`;

const BookCheck = () => {
  return (
    <StyledCard className="book-check">
      <div className="banner">예약 신청</div>
      <div className="description">
        정확한 예약을 위해 예약 정보를 확인해주세요
      </div>
    </StyledCard>
  );
};

export default BookCheck;
