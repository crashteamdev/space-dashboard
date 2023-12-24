import { createSlice } from "@reduxjs/toolkit";

// interface StateType {
//   activeCompany: string | "ke" | "uzum";
// }

const initialState = {
  activeCompany: "ke",
  limits: {
    "keAccountLimit": 0,
    "keAccountLimitCurrent": 0,
    "itemPoolLimit": 0,
    "itemPoolLimitCurrent": 0,
    "itemCompetitorLimit": 0,
    "itemCompetitorLimitCurrent": 0
  }
};

export const CompanyChangerSlice = createSlice({
  name: "companyChanger",
  initialState,
  reducers: {
    changeCompany: (state: any, action) => {
      state.activeCompany = action.payload;
    },
    changeLimits: (state: any, action) => {
      state.limits = action.payload;
    }
  }
});

export const { changeCompany, changeLimits } = CompanyChangerSlice.actions;

export default CompanyChangerSlice.reducer;
