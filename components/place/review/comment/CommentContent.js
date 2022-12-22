import React from 'react';
import styled from 'styled-components';
const Text = styled.div`
  width: 100%;
  border-top: 2px solid #111;
  border-bottom: 2px solid #111;
  position: relative;
  margin-top: 5px;
  header {
    font-size: 0.7rem;
    display: flex;
    justify-content: space-between;
  }
  .context {
    width: 90%;
    margin-top: 20px;
    min-height: 20px;
  }
  .context.hide {
    height: 20px;
    overflow-y: hidden;
  }
  .detail {
    font-size: 0.7rem;
    position: absolute;
    right: 0px;
    bottom: 5px;
    text-decoration: underline;
  }
  @media screen and (max-width: 758px) {
    .context {
      width: 80%;
    }
  }
`;
const CommentContent = ({ context, writer, writtenDate, writtenTime }) => {
  const showDetailHandler = (e) => {
    e.target.previousSibling.classList.toggle('hide');
    if (e.target.innerHTML === '...더보기') {
      e.target.innerHTML = '접기';
    } else {
      e.target.innerHTML = '...더보기';
    }
  };
  return (
    <Text>
      <header>
        <div className="writer">{writer}</div>
        <div className="writtenData">{`${writtenDate}  ${writtenTime}`}</div>
      </header>
      <div className="context hide">{context}</div>
      <div className="detail" onClick={showDetailHandler}>
        ...더보기
      </div>
    </Text>
  );
};

export default CommentContent;
