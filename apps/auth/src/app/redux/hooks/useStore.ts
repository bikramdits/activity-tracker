// import { useStoreDispatch } from "./useStoreDispatch";

// export default function useStore() {
//   const dispatch = useStoreDispatch();

// //   const /* Action functions for the user slice */ = () => {
//     // Dispatch the corresponding actions for the user slice
// //   };

//   return {
//     // Return the action functions for the user slice
//   };
// }
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
