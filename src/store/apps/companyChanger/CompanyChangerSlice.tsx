import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  activeCompany: string | "KazanExpress" | "Uzum";
}

const initialState = {
  activeCompany: "KazanExpress",
};

export const CompanyChangerSlice = createSlice({
  name: "companyChanger",
  initialState,
  reducers: {
    changeCompany: (state: any, action) => {
      state.activeCompany = action.payload;
    },
  },
});

export const { changeCompany } = CompanyChangerSlice.actions;

export default CompanyChangerSlice.reducer;
