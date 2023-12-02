import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  list: any[]
}

const initialState = {
  list: []
};

export const AlertsSlice = createSlice({
  name: "Alerts",
  initialState,
  reducers: {
    addItem: (state: StateType, action) => {
      state.list.push(action.payload);
    },
    removeItem: (state: StateType) => {
      state.list.shift();
    },
  },
});

export const { addItem, removeItem } = AlertsSlice.actions;

export default AlertsSlice.reducer;
