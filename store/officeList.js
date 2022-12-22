import { createSlice } from '@reduxjs/toolkit';

const initialOfficeListState = {
  officeList: null,
  selectedPlaceId: '',
  selectedOffice: null,
  filteredPlaceList: null,
  isFiltered: false,
  marker: [],
};

const officeSlice = createSlice({
  name: 'officeList',
  initialState: initialOfficeListState,
  reducers: {
    getAllOfficeList(state, action) {
      state.officeList = action.payload;
      state.filteredPlaceList = action.payload;
    },
    selectPlace(state, action) {
      state.selectedPlaceId = action.payload;
      const selectedPlaceIndex = state.officeList.findIndex(
        (elem) => elem.key === action.payload
      );
      state.selectedOffice = state.officeList[selectedPlaceIndex];
    },
    getOverlay(state, action) {
      state.marker.push(action.payload);
    },
    getFilteredPlaceList(state, action) {
      state.filteredPlaceList = action.payload;
      state.filteredPlaceList.length === state.officeList.length
        ? (state.isFiltered = false)
        : (state.isFiltered = true);
    },
    resetFilteredPlaceList(state) {
      state.filteredPlaceList = state.officeList;
      state.isFiltered = false;
    },
  },
});

export const officeSliceActions = officeSlice.actions;
export default officeSlice.reducer;
