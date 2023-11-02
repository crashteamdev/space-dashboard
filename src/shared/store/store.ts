import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import userReducer from "./slices/user/userSlice";
import CustomizerReducer from "./slices/customizer/CustomizerSlice";
import UserProfileReducer from "./slices/userProfile/UserProfileSlice";
import WalletPopupReducer from "./slices/walletPopup/WalletPopupSlice";
import CompanyChangerReducer from "./slices/companyChanger/CompanyChangerSlice";
import BalanceSlice from "./slices/balance/BalanceSlice";
import AccountSlice from "./slices/account/AccountSlice";

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
