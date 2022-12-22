import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { Pagination } from 'swiper';
import ReviewBanner from './ReviewBanner';
import ReviewItem from './ReviewItem';

const Wrapper = styled.section`
  width: 100%;
  border-top: 3px solid #999;
  overflow-x: hidden;

  .no-review-message {
    text-align: center;
    line-height: 50px;
  }
  .paginationBtns {
    width: 80%;
    padding-top: 60px;
    padding-bottom: 60px;
    margin: auto;
    height: 40px;
    list-style: none;
    display: flex;
    justify-content: center;
  }
  .paginationBtns a {
    padding: 10px;
    margin: 8px;
    border-radius: 5px;
    border: 1px solid #111;
    color: #111;
    cursor: pointer;
  }
  .paginationBtns a:hover {
    color: #fff;
    background: #2b2eff;
  }
  .paginationActive a {
    color: #111;
    background: #6a9eff;
  }
`;

const Review = ({ rating, count }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingList, setRatingList] = useState({});
  const [maxPage, setMaxPage] = useState(0);
  const [noReviewMessage, setNoReviewMessage] = useState('');
  const params = useRouter();
  const placeId = params.query.id;
  const changePageHandler = ({ selected }) => {
    setCurrentPage(selected);
  };
  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axios({
          url: `/api/main/review`,
          method: 'post',
          data: {
            placeId,
            currentPage,
          },
        });
        if (response.status === 200) {
          setRatingList(response.data.reviewData);
          setMaxPage(response.data.paginationData.maxPage);
        } else {
          throw new Error(response.data);
        }
      } catch (error) {
        setNoReviewMessage(error.response.data.message);
      }
    };
    fetchReviewData();
  }, [currentPage]);
  return (
    <Wrapper id="review">
      <ReviewBanner rating={rating} count={count} />
      {noReviewMessage.length === 0 ? (
        Object.keys(ratingList).map((elem) => (
          <ReviewItem
            key={ratingList[elem].ratingId}
            ratingId={ratingList[elem].ratingId}
            score={ratingList[elem].ratingScore}
            writer={ratingList[elem].ratingWriter}
            date={ratingList[elem].writeDate}
            roomType={ratingList[elem].usedRoomType}
            content={ratingList[elem].ratingContent}
            commentQuantity={ratingList[elem].commentQuantity}
          />
        ))
      ) : (
        <h1 className="no-review-message">{noReviewMessage}</h1>
      )}
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageRangeDisplayed={1}
        pageCount={maxPage}
        onPageChange={changePageHandler}
        containerClassName={'paginationBtns'}
        previousLinkClassName={'previousBtn'}
        nextLinkClassName={'nextBtn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
    </Wrapper>
  );
};

export default Review;
