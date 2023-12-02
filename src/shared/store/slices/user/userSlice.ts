import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/shared/types/apps/user";

interface StateType {
  data: IUser
}

const initialState = {
  data: {
    uid: "",
    accessToken: "",
    displayName:  null,
    email: "",
    photoURL: null,
  }
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state: StateType, action) => {
      state.data = action.payload;
    },
    deleteUser: (state: StateType) => {
      state.data = {
        uid: "",
        accessToken: "",
        displayName:  null,
        email: "",
        photoURL: null,
      };
    },
  },
});

export const { setUser, deleteUser } = UserSlice.actions;

export default UserSlice.reducer;
