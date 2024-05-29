import { createSlice } from "@reduxjs/toolkit";

const memberSlice = createSlice({
  name: "member",
  initialState: {
    user: null, // { userId, userPw, userName, zipCode, addr1, addr2}
  },
  reducers: {
    userLogin(state, action) {
      const { userId, userPw, userName, zipCode, addr1, addr2 } =
        action.payload;
      state.user = {
        userId,
        userPw,
        userName,
        zipCode,
        addr1,
        addr2,
      };
      localStorage.loging = JSON.stringify({ userId: userId });
    },
    localUser(state, action) {
      state.user = action.payload;
    },
    userLogout(state, action) {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { initMembers, userLogin, userLogout, localUser } =
  memberSlice.actions;

export default memberSlice.reducer;
