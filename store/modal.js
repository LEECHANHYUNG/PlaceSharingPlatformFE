import { createSlice } from '@reduxjs/toolkit';

const initialModalState = {
  isLoginClicked: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModalState,
  reducers: {
    loginClick(state) {
      state.isLoginClicked = !state.isLoginClicked;
    },
    modalHandler(state) {
      state.isLoginClicked = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
