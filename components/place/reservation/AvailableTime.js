import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import TimeButton from '../../ui/TimeButton';
import 'swiper/swiper-bundle.min.css';
import Card from '../../ui/Card';
import { reservationActions } from '../../../store/reservation';
import Button from '../../ui/Button';
import styled from 'styled-components';

const Wrapper = styled(Card)`
  margin: 0;
  width: 100%;
  border-top: 3px solid #6a9eff;
  border-radius: 0;
  margin-top: 30px;
  .swiper {
    width: 100%;
    margin-right: 100%;
    padding-top: 15px;
  }
  .active {
    background: #fff;
    text-align: center;
    cursor: pointer;
  }
  .nonActive {
    background: rgb(122, 119, 119);
    text-align: center;
  }

  .line {
    border-top: 2px solid rgb(106, 158, 255);
    border-bottom: 2px solid rgb(106, 158, 255);
  }
  .checkStatus {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
  }
  .checkStatus div {
    border: 2px solid #111;
    width: 17px;
    height: 17px;
  }
  .disabled {
    background: rgb(122, 119, 119);
  }
  .available {
    background: #fff;
  }
  .checked {
    background: rgb(106, 158, 255);
  }
`;

const AvailableTime = () => {
  const selectDate = useSelector((state) => state.reservation.date);
  const dispatch = useDispatch();
  const avaialbleTimeList = useSelector((state) => state.reservation.timelist);
  const timeList = useSelector((state) => state.reservation.timeList);
  const selectedDate = useSelector((state) => state.reservation.date);
  const selectItem = useSelector((state) => state.reservation.itemId);
  const dateArr = selectedDate.split('. ');
  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2].substr(0, dateArr[2].length - 1);
  const selectTimeList = useSelector(
    (state) => state.reservation.selectTimeList
  );

  const submitReservationHandler = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/places/${params.officeId}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedType: selectItem,
          year,
          month,
          day,
          startTime: String(selectTimeList[0]),
          endTime: String(selectTimeList[1] || selectTimeList[0]),
          userId,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          if (Object.keys(data).length === 0) {
            alert('예약 성공');
          } else {
            let errorMsg = '';
            for (const errorMessage in data) {
              errorMsg += data[errorMessage];
              errorMsg += `${`\r`}`;
            }
            alert(errorMsg);
          }
        });
    } catch (err) {
      alert(err);
    }
  };
  let availableFullTimeList = [];

  for (let i = selectTimeList[0]; i <= selectTimeList[1]; i++) {
    if (timeList.includes(i)) {
      availableFullTimeList.push(i);
    } else {
      timeList.forEach((elem) => {
        if (!!document.getElementById(`time${elem}`)) {
          document.getElementById(`time${elem}`).style.backgroundColor = '#fff';
        }
      });
      availableFullTimeList = [];
      alert('예약이 불가능한 시간이 포함되어 있습니다.');
      dispatch(selectTimeActions.deleteList());
      break;
    }
  }
  const selectTimeHandler = (e) => {
    if (selectTimeList.length === 2) {
      timeList.forEach(
        (elem) =>
          (document.getElementById(`time${elem}`).style.backgroundColor =
            '#fff')
      );
    }
    dispatch(reservationActions.select(e.target.id));
    document.getElementById(`time${e.target.id}`).style.backgroundColor =
      'rgb(106, 158, 255)';
  };
  useEffect(() => {
    availableFullTimeList.forEach((elem) => {
      document.getElementById(`time${elem}`).style.backgroundColor =
        'rgb(106, 158, 255)';
    });
  }, [availableFullTimeList]);
  return (
    <Wrapper>
      <h1>이용 가능 시간</h1>
      <Swiper slidesPerView={8} className="swiper">
        {avaialbleTimeList.map((elem, idx) =>
          !!elem ? (
            <SwiperSlide
              key={`time${idx}`}
              className="active"
              onClick={selectTimeHandler}
              id={`time${idx}`}
            >
              <TimeButton time={idx} />
            </SwiperSlide>
          ) : (
            <SwiperSlide key={`time${idx}`} className="nonActive">
              <TimeButton time={idx} />
            </SwiperSlide>
          )
        )}
      </Swiper>
      <div className="checkStatus">
        <label>불가</label>
        <div className="disabled"></div>
        <label>가능</label>
        <div className="available"></div>
        <label>선택</label>
        <div className="checked"></div>
      </div>
      <div>
        <h3>예약 시간</h3>
        <p>날짜</p>
        {selectDate}
        <p>시간</p>
        {selectTimeList[0] &&
          !selectTimeList[1] &&
          `${selectTimeList[0]}:00 ~ ${selectTimeList[0]}:00`}
        {selectTimeList[1] &&
          `${selectTimeList[0]}:00 ~ ${selectTimeList[1]}:00`}
      </div>
      {selectTimeList[0] && (
        <Button onClick={submitReservationHandler}>예약</Button>
      )}
    </Wrapper>
  );
};

export default AvailableTime;
