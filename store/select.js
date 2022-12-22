import { createSlice } from '@reduxjs/toolkit';

const initialSelectedState = {
  selectedCityNum: '0',
  selectedCity: '0',
  selectSubCity: '0',
  startTime: '24',
  endTime: '0',
  selectedType: '0',
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState: initialSelectedState,
  reducers: {
    getStartTime(state, action) {
      state.startTime = action.payload;
    },
    getEndTime(state, action) {
      state.endTime = action.payload;
    },
    getSelectedCityNum(state, action) {
      state.selectedCityNum = action.payload;
    },
    getSelectedCity(state, action) {
      state.selectedCity = action.payload;
    },
    getSelectedSubCity(state, action) {
      state.selectSubCity = action.payload;
    },
    getSelectedType(state, action) {
      state.selectedType = action.payload;
    },
  },
});

export const selectedSliceActions = selectedSlice.actions;
export default selectedSlice.reducer;
