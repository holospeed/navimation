import {createSlice} from '@reduxjs/toolkit';
import {IIsLoggedIn} from './types';

const initialState: IIsLoggedIn = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const {login, logout} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
