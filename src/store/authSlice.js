import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

//auth Account
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // login is action
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData; // state.userData = action.payload
    },
    // logout is action
    logout: (state) => {
      state.status = false;
      state.userData = null; // state.userData = null after logout
    },
  },
});

export const { login, logout } = authSlice.actions; //action is login and logout

export default authSlice.reducer;

