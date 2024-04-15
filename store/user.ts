import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    list: [
      {
        name: "tangxiaoxin",
        email: "1302947749@qq.com",
        avatar: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        git: "https://github.com/ziluo-tang",
      },
    ],
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.list = action.payload;
    },
    insertUser: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { setUserInfo, insertUser } = userSlice.actions;

export const selectAllUser = (state) => state.user.list;

export default userSlice.reducer;
