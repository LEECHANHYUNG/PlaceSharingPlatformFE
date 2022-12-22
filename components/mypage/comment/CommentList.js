import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';

const Wrapper = styled.section`
  height: auto;
`;

const CommentList = ({ item, paginationData, ratingId }) => {
  return (
    <Wrapper>
      <Comment
        item={item}
        paginationData={paginationData}
        reviewComment={true}
        ratingId={ratingId}
      />
    </Wrapper>
  );
};

export default CommentList;
