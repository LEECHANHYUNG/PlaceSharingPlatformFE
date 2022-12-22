import { createSlice } from '@reduxjs/toolkit';

const initialPaymentState = {
  paymentType: '',
  useMileage: 0,
  showForm: false,
  amount: 0,
  company: '',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialPaymentState,
  reducers: {
    getSelectedPaymentType(state, action) {
      state.paymentType = action.payload;
    },
    resetPaymentInfo(state) {
      state.paymentType = '';
      state.useMileage = 0;
      state.amount = 0;
      state.showForm = false;
      state.company = '';
    },
    getUseMileage(state, action) {
      state.useMileage = action.payload;
    },
    getPaymentForm(state, action) {
      state.showForm = action.payload;
    },
    getPaymentAmount(state, action) {
      state.amount = action.payload;
    },
    getPaymentCompany(state, action) {
      state.company = action.payload;
    },
  },
});

export const paymentSliceActions = paymentSlice.actions;
export default paymentSlice.reducer;
