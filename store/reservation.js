import { createSlice } from '@reduxjs/toolkit';

const initialReservationState = {
  selectedType: null,
  selectedTypeEng: null,
  reservationItem: null,
  unableDateList: [],
  ableDateList: [],
  openingHours: [],
  selectedStartTime: 24,
  selectedEndTime: 24,
  timeList: [],
  selectTimeList: [],
  isSelected: false,
  isLoading: false,
  itemPrice: null,
  date: new Date(),
  reservationInfo: {},
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: initialReservationState,
  reducers: {
    getSelectedType(state, action) {
      state.selectedType = action.payload;
    },
    getSelectedTypeEng(state, action) {
      state.selectedTypeEng = action.payload;
    },
    getReservationItem(state, action) {
      state.reservationItem = action.payload;
    },
    getUnableDayList(state, action) {
      state.unableDateList = action.payload;
    },
    getAbleDayList(state, action) {
      state.ableDateList = action.payload;
    },
    getOpeningHours(state, action) {
      state.openingHours = action.payload;
    },
    getSelectedStartTime(state, action) {
      state.selectedStartTime = action.payload;
    },
    getSelectedEndTime(state, action) {
      state.selectedEndTime = action.payload;
    },
    getTimeList(state, action) {
      state.timeList = action.payload;
    },

    selectDate(state, action) {
      state.date = action.payload;
    },
    getLoadingState(state, action) {
      state.isLoading = action.payload;
    },
    getReservationInfo(state, action) {
      state.reservationInfo = action.payload;
    },
  },
});

export const reservationActions = reservationSlice.actions;
export default reservationSlice.reducer;
