import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboardData: {},
  },
  reducers: {
    setData(state, action) {
      state.dashboardData = action.payload;
    },
  },
  //添加异步reducer
  extraReducers(builder) {
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.dashboardData = action.payload;
    });
  },
});

export const { setData } = dashboardSlice.actions;


//异步action
export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async () => {
    const ret = await request({ email: "1302947749@qq.com" });
    return ret;
  }
);

const request = (args) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(args);
    }, 1000);
  });

export default dashboardSlice.reducer;
