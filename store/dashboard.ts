import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Request from "./request";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
  //register async reducer
  extraReducers(builder) {
    builder.addCase(getDashboardData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getDashboardData.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { setData } = dashboardSlice.actions;

//async action
export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async () => {
    return await Request.get("/api/dashboard");
  }
);

export const selectDashboard = (state) => state.dashboard;

export default dashboardSlice.reducer;
