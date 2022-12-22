import { useSession } from 'next-auth/react';
import React from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import Banner from './Banner';
import PointItem from './PointItem';

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  h1 {
    font-size: 2rem;
    margin-top: 20px;
    border-bottom: 3px solid #111;
  }
  .itemlist {
    width: 100%;
  }
  .pagination-btns {
    width: 80%;
    height: 40px;
    margin: auto;
    padding: 50px 0;
    list-style: none;
    display: flex;
    justify-content: center;
  }
  .pagination-btns a {
    padding: 10px;
    margin: 8px;
    border-radius: 5px;
    border: 1px solid #111;
    color: #111;
    cursor: pointer;
  }
  .pagination-btns a:hover {
    color: #fff;
    background: #2b2eff;
  }
  .paginationActive a {
    color: #111;
    background: #6a9eff;
  }
  @media screen and (max-width: 1170px) {
    h1 {
      padding-top: 20px;
      font-size: 1.3rem;
    }
    width: 96vw;
    margin: 0;
  }
`;

const Point = ({ item, paginationData }) => {
  const [totalPage, setTotalPage] = useState(paginationData);
  const [pointList, setPointList] = useState(item);
  const session = useSession();
  const changePageHandler = async ({ selected }) => {
    try {
      const response = await axios({
        url: `/api/mypage/mypage`,
        method: 'post',
        data: {
          url: `mypage/mileage?page=`,
          accessToken: session.data.user.accessToken,
          page: selected,
        },
      });

      if (response.status === 200) {
        setPointList(response.data.commentData);
        setTotalPage(response.data.paginationData.maxPage);
      }
    } catch (error) {
    }
  };
  return (
    <Wrapper>
      <h1>마일리지</h1>
      <Banner />
      <section className="itemList">
        {Object.keys(pointList).map((elem) => (
          <PointItem key={elem} item={pointList[elem]} />
        ))}
      </section>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageRangeDisplayed={1}
        pageCount={totalPage}
        onPageChange={changePageHandler}
        containerClassName={'pagination-btns'}
        activeClassName={'paginationActive'}
      />
    </Wrapper>
  );
};

export default Point;
