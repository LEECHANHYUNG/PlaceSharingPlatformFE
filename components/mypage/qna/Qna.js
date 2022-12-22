import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Banner from './Banner';
import NewQna from './NewQna';
import QnaItem from './QnaItem';

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
    padding-top: 50px;
    margin: auto;
    height: 40px;
    list-style: none;
    display: flex;
    justify-content: center;
  }
  .paginationBtns a {
    padding: 10px;f
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
  button {
    margin: 10px 0px;
  }

  @media screen and (max-width: 1170px) {
    width: 90vw;
    margin: 0 auto;
  }
`;

const Qna = ({ item, paginationData }) => {
  const [totalPage, setTotalPage] = useState(paginationData);
  const [items, setItems] = useState(item);
  const [newQna, setNewQna] = useState(false);
  const [qnaData, setQnaData] = useState(null);
  const session = useSession();
  const addNewQnaHandler = () => {
    setNewQna(true);
  };
  const changePageHandler = async ({ selected }) => {
    try {
      const response = await axios({
        url: `/api/mypage/mypage`,
        method: 'post',
        data: {
          url: 'mypage/qna?page=',
          accessToken: session.data.user.accessToken,
          page: selected + 1,
        },
      });

      if (response.status === 200) {
        setItems(response.data.qnaData);
        setTotalPage(response.data.paginationData.maxPage);
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    const itemsArr = [qnaData];
    if (qnaData) {
      Object.values(item).map((elem, idx) => {
        if (idx <= 6) {
          itemsArr.push(elem);
        }
      });
      setItems(Object.assign({}, itemsArr));
    }
  }, [qnaData]);
  return (
    <Wrapper>
      {!newQna ? (
        <div>
          <h1>1:1 문의</h1>
          <Button onClick={addNewQnaHandler}>문의하기</Button>
          <Banner />
          <div className="itemList">
            {Object.keys(items).map((elem) => (
              <QnaItem
                item={items[elem]}
                key={items[elem].questionData.inquiryId}
              />
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
        </div>
      ) : (
        <div>
          <NewQna
            setQnaData={(data) => {
              setQnaData(data);
            }}
            addNewQna={(state) => {
              setNewQna(state);
            }}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default Qna;
