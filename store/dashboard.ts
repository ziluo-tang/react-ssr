import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    const ret = await request([
      { label: "UserName", children: "Zhou Maomao" },
      { label: "Telephone", children: "1810000000" },
      { label: "Live", children: "Hangzhou, Zhejiang" },
      { label: "Remark", children: "empty" },
      {
        label: "Address",
        children:
          "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
      },
    ]);
    return ret;
  }
);

const request = (args) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(args);
    }, 1000);
  });

export const selectDashboard = (state) => state.dashboard;

export default dashboardSlice.reducer;
