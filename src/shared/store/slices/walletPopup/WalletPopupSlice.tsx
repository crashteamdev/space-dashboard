import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  open: boolean;
  value: number;
  provider: string;
}

const initialState = {
  open: false,
  value: 0,
  provider: ""
};

export const WalletPopupSlice = createSlice({
  name: "walletPopup",
  initialState,
  reducers: {
    setOpen: (state: StateType, action) => {
      state.open = action.payload;
    },
    setValue: (state: StateType, action) => {
      state.value = action.payload;
    },
    setProvider: (state: StateType, action) => {
      state.provider = action.payload;
    }
  }
});

export const { setOpen, setValue, setProvider } = WalletPopupSlice.actions;

export default WalletPopupSlice.reducer;
