import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../types/authState';

const initialState: AuthState = {
  id: '',
  name: 'Neolytics',
  email: '',
  numOfUser: 10,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeUser: (state) => {
      state.numOfUser--;
    },
    userList: (state, action) => {
      state.numOfUser += action.payload;
    },
  },
});

export const { removeUser, userList } = authSlice.actions;

export default authSlice.reducer;
