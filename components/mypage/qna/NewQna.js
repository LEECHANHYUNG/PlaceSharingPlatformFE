import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { placeSliceActions } from '../../../store/place';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
const NewQna = ({ addNewQna, setQnaData }) => {
  const titleInputRef = useRef();
  const session = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const addQnaHandler = async (e) => {
    try {
      const response = await axios({
        url: '/api/mypage/newQna',
        method: 'post',
        data: {
          title: titleInputRef.current.value,
          question: e.target.previousSibling.value,
          accessToken: session.data.user.accessToken,
        },
      });
      if (response.status === 200) {
        alert('1:1문의가 등록되었습니다.');
        router.replace('/mypage/qna');
        setQnaData({
          answerData: { answerContext: '' },
          questionData: {
            inquiryContext: e.target.previousSibling.value,
            inquiryId: 'newqna',
            inquiryTitle: titleInputRef.current.value,
            processingStatus: false,
            writtenDate: new Date()
              .toLocaleDateString()
              .replace(/. /g, '-')
              .slice(0, -1),
          },
        });
        addNewQna(false);
      } else {
        throw new Error();
      }
    } catch (error) {
      alert('잠시후 다시 시도해주세요.');
    }
  };
  const inputValueHandler = () => {
    dispatch(placeSliceActions.getEnteredQna(titleInputRef.current.value));
  };
  const cancelAddNewQnaHandler = () => {
    addNewQna(false);
  };
  return (
    <div>
      <h1>문의 작성</h1>
      <Button onClick={cancelAddNewQnaHandler}>취소</Button>
      <div className="title">
        <label htmlFor="title">제목</label>
        <Input
          placeholder="제목을 입력해주세요(최대 40자)"
          ref={titleInputRef}
          maxLength={40}
          onChange={inputValueHandler}
        />
      </div>
      <div className="content">
        <label htmlFor="content">문의 내용</label>
        <TextArea
          maxLength={400}
          placeholder="문의 내용을 입력해주세요(최대 400자)"
          addCommentHandler={addQnaHandler}
          addNewQna={addNewQna}
        />
      </div>
    </div>
  );
};

export default NewQna;
