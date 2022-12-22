import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { placeSliceActions } from '../../../../store/place';
import Card from '../../../ui/Card';
import TextArea from '../../../ui/TextArea';
import CommentContent from './CommentContent';
const Wrapper = styled(Card)`
  width: 100%;
  position: relative;
  border: 1px solid #6a9eff;
  margin-top: 30px;
  & ::-webkit-scrollbar {
    width: 0px;
  }

  .new-comment {
    width: 300px;
  }
  img {
    cursor: pointer;
  }

  @media screen and (max-width: 1170px) {
    width: 100%;
  }
  @media screen and (max-width: 758px) {
    border: none;
    border-top: 3px solid #6a9eff;
    border-radius: 0px;
    position: relative;
    right: 15px;
    top: 30px;
    margin-top: 10px;
    width: 88vw;
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
const Comment = () => {
  const commentId = useSelector((state) => state.place.selectedCommentId);
  const commentData = useSelector((state) => state.place.commentData);
  const [commentList, setCommentList] = useState(commentData);
  const router = useRouter();
  const dispatch = useDispatch();
  const closeCommentHandler = () => {
    dispatch(placeSliceActions.getSelectedCommentId(0));
  };
  const session = useSession();
  const addCommentHandler = async (e) => {
    try {
      const response = await axios({
        url: '/api/main/add-comment',
        method: 'post',
        data: {
          commentId,
          context: e.target.previousSibling.value,
          accessToken: session.data.user.accessToken,
        },
      });
      if (response.status === 200) {
        setCommentList(response.data);
        alert('댓글 등록 완료');
      } else {
        throw new Error();
      }
    } catch (error) {
      alert('잠시후 다시 시도해주세요');
    }
    e.target.previousSibling.value = '';
  };
  const changePageHandler = async ({ selected }) => {
    try {
      const response = await axios({
        url: '/api/main/comment',
        method: 'post',
        data: {
          placeId: router.query.id,
          commentId,
          page: selected + 1,
        },
      });
      if (response.status === 200) {
        setCommentList(response.data);
      }
    } catch (error) {}
  };
  return (
    <Wrapper>
      <Image
        src="/svg/x-mark.svg"
        width="25"
        height="25"
        onClick={closeCommentHandler}
      />
      <TextArea
        placeholder={'댓글 입력'}
        addCommentHandler={addCommentHandler}
        placeComment={true}
      ></TextArea>
      {typeof commentList !== 'string' ? (
        Object.keys(commentList.commentData).map((elem) => (
          <CommentContent
            key={elem}
            writer={commentList.commentData[elem].writer}
            context={commentList.commentData[elem].context}
            writtenDate={commentList.commentData[elem].writtenDate}
            writtenTime={commentList.commentData[elem].writtenTime}
          />
        ))
      ) : (
        <h4>{commentList}</h4>
      )}
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageRangeDisplayed={1}
        pageCount={commentList.paginationData?.maxPage || 0}
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

export default Comment;
