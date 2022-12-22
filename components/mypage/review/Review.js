import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import Banner from './Banner';
import ReviewItem from './ReviewItem';

const Wrapper = styled.section`
  width: 100%;

  h1 {
    font-size: 2rem;
    margin-top: 20px;
  }
  .itemlist {
    width: 100%;
  }

  .paginationBtns {
    width: 80%;
    padding-top: 150px;
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
  @media screen and (max-width: 1170px) {
    width: 94vw;
  }
  @media screen and (max-width: 858px) {
    h1 {
      font-size: 1.3rem;
      padding-bottom: 20px;
    }
  }
`;

const Review = ({ item, paginationData }) => {
  const [totalPage, setTotalPage] = useState(paginationData);
  const [items, setItems] = useState(item);
  const session = useSession();
  const changePageHandler = async ({ selected }) => {
    try {
      const response = await axios({
        url: `/api/mypage/mypage`,
        method: 'post',
        data: {
          url: 'mypage/review?page=',
          accessToken: session.data.user.accessToken,
          page: selected + 1,
        },
      });

      if (response.status === 200) {
        setItems(response.data.reviewData);
        setTotalPage(response.data.paginationData.maxPage);
      }
    } catch (error) {
  }
  };

  return (
    <Wrapper>
      <h1>작성 후기</h1>
      <Banner />
      <div className="itemList">
        {Object.keys(items).map((elem) => (
          <ReviewItem item={items[elem]} key={items[elem].ratingId} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={totalPage}
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
