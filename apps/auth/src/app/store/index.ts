import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';

export const globalStore = configureStore({
  reducer: {
    auth: authReducer
  },
});
export default {
  globalStore
};
export type RootState = ReturnType<typeof globalStore.getState>
export type AppDispatch = typeof globalStore.dispatch
console.log('instial state',globalStore.getState());

