import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  open: boolean;
}

const initialState = {
  open: false,
};

export const WalletPopupSlice = createSlice({
  name: "walletPopup",
  initialState,
  reducers: {
    setOpen: (state : StateType, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = WalletPopupSlice.actions;

export default WalletPopupSlice.reducer;
