import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { placeSliceActions } from '../../../store/place';

const Text = styled.div`
  position: relative;
  .content {
    margin-bottom: 10px;
    overflow-y: hidden;
    min-height: 45px;
  }
  .count {
    position: absolute;
    bottom: -20px;
    right: 10px;
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 800;
  }
  .content.hide {
    height: 45px;
  }
  .detail {
    position: absolute;
    bottom: -20px;
    left: 10px;
    font-size: 0.8rem;
    cursor: pointer;
    color: #888;
  }
`;

const ReviewContent = ({ content, ratingId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const placeId = router.query.id;
  const showDetailHandler = (e) => {
    e.target.previousSibling.previousSibling.classList.toggle('hide');
    if (e.target.innerHTML === '...더보기') {
      e.target.innerHTML = '접기';
    } else {
      e.target.innerHTML = '...더보기';
    }
  };
  const showCommentHandler = async (e) => {
    try {
      const response = await axios({
        url: '/api/main/comment',
        method: 'post',
        data: {
          placeId,
          commentId: e.target.previousSibling.childNodes[0].value,
          page: 1,
        },
      });
      if (response.status === 200) {
        dispatch(placeSliceActions.getCommentData(response.data));
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(placeSliceActions.getCommentData(error.response.data.message));
    }
    dispatch(
      placeSliceActions.getSelectedCommentId(
        e.target.previousSibling.childNodes[0].value
      )
    );
  };
  return (
    <Text>
      <div className="content hide">
        <input type="hidden" value={ratingId} />
        {content}
      </div>
      <div className="count" onClick={showCommentHandler}>
        댓글 보기
      </div>
      <div className="detail" onClick={showDetailHandler}>
        ...더보기
      </div>
    </Text>
  );
};

export default ReviewContent;
