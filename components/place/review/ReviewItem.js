import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Card from '../../ui/Card';
import Comment from './comment/Comment';
import ReviewContent from './ReviewContent';
import Reviewer from './Reviewer';
import ReviewRating from './ReviewRating';

const ReviewCard = styled(Card)`
  border: 2px solid #6a9eff;
  margin: 30px;
  width: 90%;
  @media screen and (max-width: 758px) {
    margin: 0px;
    margin-top: 10px;
    width: 100%;
  }
`;

const ReviewItem = ({ score, writer, date, roomType, content, ratingId }) => {
  const selectedCommentId = useSelector(
    (state) => state.place.selectedCommentId
  );
  return (
    <ReviewCard>
      <ReviewRating score={score} />
      <Reviewer writer={writer} createDate={date} type={roomType} />
      <ReviewContent content={content} ratingId={ratingId} />
      {+selectedCommentId === ratingId ? <Comment /> : ''}
    </ReviewCard>
  );
};

export default ReviewItem;
