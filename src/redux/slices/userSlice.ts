import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import User from "../../interfaces/User";
import {authHandler} from "../../apis/handler/auth/index";

export interface UserState {
  data: Array<User>;
  isLoading: boolean;
  error: string | null | any;
}

const initialState: UserState = {
  data: [],
  isLoading: false,
  error: null,
};

// Actions

export const getAllUsersAction: any = createAsyncThunk(
  "users/getAllUSers",
  async () => {
    try {
      const users = await axios.get("http://localhost:3000/users");
      return users?.data;
    } catch (err) {
      return err;
    }
  }
);

export const addUserAction: any = createAsyncThunk("users/addUser", async () => {
  try {

    const user = await authHandler.register({
      id: 6,
      name: "New User",
      age: 25,
      position: "Developer",
    })

     return user;
  } catch (err) {
    return err;
  }
});

const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllUsersAction.fulfilled,
      (state, action: PayloadAction<Array<User>>) => {
        console.log("Action data: ", action?.payload);
        console.log("State: ", state?.data);
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(getAllUsersAction.rejected, (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = action.error;
    });
    builder.addCase(
      addUserAction.fulfilled,
      (state, action: PayloadAction<Array<User>>) => {
        console.log("User:", action?.payload);
        state.data = [...state.data, action.payload] as Array<User>;
      }
    );
  },
});

export default UserSlice;
