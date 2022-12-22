import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DatePick from '../../ui/DatePick';
import SelectEndTime from './SelectEndTime';
import SelectTime from './SelectTime';

const DeskMeetingRoomForm = () => {
  const [loading, setLoading] = useState(false);

  const isLoading = useSelector((state) => state.reservation.isLoading);
  const reservationItem = useSelector(
    (state) => state.reservation.reservationItem
  );
  const selectedStartTime = useSelector(
    (state) => state.reservation.selectedStartTime
  );
  const [startTime, setStartTime] = useState(selectedStartTime);
  const selectedEndTime = useSelector(
    (state) => state.reservation.selectedEndTime
  );
  useEffect(() => {
    setStartTime(selectedStartTime);
  }, [selectedStartTime]);

  return (
    <section>
      {reservationItem && !isLoading ? (
        <div className="item">
          <div>이용 날짜 선택</div>
          <DatePick />
        </div>
      ) : (
        ''
      )}
      {reservationItem && !isLoading ? (
        <SelectTime setLoading={(state) => setLoading(state)} />
      ) : (
        ''
      )}
      {selectedStartTime !== 24 ? <SelectEndTime /> : ''}
      {reservationItem ? (
        <div className="item">
          선택 시간
          {!isLoading ? (
            <div className="time">{`시작 시간 : ${
              selectedStartTime !== 24 ? selectedStartTime + ':00' : ''
            }`}</div>
          ) : (
            ''
          )}
          {!isLoading && selectedStartTime !== 24 ? (
            <div className="time">{`종료 시간 :${
              selectedEndTime != 24 ? selectedEndTime + ':50' : ''
            }`}</div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      {loading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ''
      )}
    </section>
  );
};

export default DeskMeetingRoomForm;
