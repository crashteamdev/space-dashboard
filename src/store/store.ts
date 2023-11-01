import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import userReducer from "./user/userSlice";
import CustomizerReducer from "./customizer/CustomizerSlice";
import UserProfileReducer from "./apps/userProfile/UserProfileSlice";
import WalletPopupReducer from "./apps/walletPopup/WalletPopupSlice";
import CompanyChangerReducer from "./apps/companyChanger/CompanyChangerSlice";
import BalanceSlice from "./apps/balance/BalanceSlice";
import AccountSlice from "./apps/account/AccountSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    walletPopup: WalletPopupReducer,
    companyChanger: CompanyChangerReducer,
    customizer: CustomizerReducer,
    userpostsReducer: UserProfileReducer,
    balanceReducer: BalanceSlice,
    accountReducer: AccountSlice
  },
  devTools: process.env.NODE_ENV !== "production",
});

const rootReducer = combineReducers({
  user: userReducer,
  walletPopup: WalletPopupReducer,
  companyChanger: CompanyChangerReducer,
  customizer: CustomizerReducer,
  userpostsReducer: UserProfileReducer,
  balanceReducer: BalanceSlice,
  accountReducer: AccountSlice
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
