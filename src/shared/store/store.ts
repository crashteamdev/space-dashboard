import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import CustomizerReducer from "./slices/customizer/CustomizerSlice";
import UserProfileReducer from "./slices/userProfile/UserProfileSlice";
import WalletPopupReducer from "./slices/walletPopup/WalletPopupSlice";
import CompanyChangerReducer from "./slices/companyChanger/CompanyChangerSlice";
import BalanceSlice from "./slices/balance/BalanceSlice";
import AccountSlice from "./slices/account/AccountSlice";
import AlertsSlice from "./slices/alerts/AlertsSlice";
import RepriceSlice from "./slices/reprice/repriceSlice";

export const store = configureStore({
  reducer: {
    walletPopup: WalletPopupReducer,
    companyChanger: CompanyChangerReducer,
    customizer: CustomizerReducer,
    userpostsReducer: UserProfileReducer,
    balanceReducer: BalanceSlice,
    accountReducer: AccountSlice,
    alertsReducer: AlertsSlice,
    repriceReducer: RepriceSlice
  },
  devTools: process.env.NODE_ENV !== "production"
});

const rootReducer = combineReducers({
  walletPopup: WalletPopupReducer,
  companyChanger: CompanyChangerReducer,
  customizer: CustomizerReducer,
  userpostsReducer: UserProfileReducer,
  balanceReducer: BalanceSlice,
  accountReducer: AccountSlice,
  alertsReducer: AlertsSlice,
  repriceReducer: RepriceSlice
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
