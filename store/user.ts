import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Request from "./request";

const userSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.list = action.payload;
    },
    insertUser: (state, action) => {
      state.list.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { setUserInfo, insertUser } = userSlice.actions;

export const getUserList = createAsyncThunk("user/getUserList", async () => {
  return await Request.get("/api/user");
});

export const selectAllUser = (state) => state.user.list;

export default userSlice.reducer;
