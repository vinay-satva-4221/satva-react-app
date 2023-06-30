import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
  }, //add reducers here
});

export default store;
