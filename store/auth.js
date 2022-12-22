import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  enteredEmail: '',
  enteredPassword: '',
  enteredSecondPassword: '',
  enteredName: '',
  enteredPhone: '',
  enteredAuthNumber: '',
  checkedPassword: '',
  emailBlur: false,
  passwordBlur: false,
  passwordSecondBlur: false,
  nameBlur: false,
  phoneBlur: false,
  authNumberBlur: false,
  emailIsValid: null,
  passwordIsValid: null,
  passwordSecondIsValid: null,
  nameIsValid: null,
  phoneIsValid: null,
  authNumberIsValid: null,
  authNumberAuthenticated: false,
  passwordIsEqual: false,
};

const emailRegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const passwordRegExp =
  /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
const nameRegExp = /^[가-힣]{2,4}$/;
const phoneRegExp = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/;
const authNumberRegExp = /^[A-Za-z0-9]{4}$/;
const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    resetValidation(state) {
      state.enteredEmail = '';
      state.enteredPassword = '';
      state.enteredName = '';
      state.enteredPhone = '';
      state.enteredAuthNumber = '';
      state.checkedPassword = '';
      state.emailIsValid = null;
      state.passwordIsValid = null;
      state.nameIsValid = null;
      state.phoneIsValid = null;
      state.authNumberIsValid = null;
      state.authNumberAuthenticated = false;
    },
    getEmailValid(state, action) {
      state.enteredEmail = action.payload;
      state.emailIsValid = emailRegExp.test(action.payload);
    },
    getPasswordValid(state, action) {
      state.enteredPassword = action.payload;
      state.passwordIsValid = passwordRegExp.test(action.payload);
    },
    getPasswordSecondValid(state, action) {
      state.enteredSecondPassword = action.payload;
      state.passwordSecondIsValid = passwordRegExp.test(action.payload);
    },
    getNameValid(state, action) {
      state.enteredName = action.payload;
      state.nameIsValid = nameRegExp.test(action.payload);
    },
    getPhoneValid(state, action) {
      state.enteredPhone = action.payload;
      state.phoneIsValid = phoneRegExp.test(action.payload);
    },
    getAuthNumberValid(state, action) {
      state.enteredAuthNumber = action.payload;
      state.authNumberIsValid = authNumberRegExp.test(action.payload);
    },
    getAuthNumberAuthenticated(state, action) {
      state.authNumberAuthenticated = action.payload;
    },
    getPasswordIsEqual(state, action) {
      state.passwordIsEqual = action.payload;
    },
    getCheckedPassword(state, action) {
      state.checkedPassword = action.payload;
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
