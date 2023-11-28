import { TopUpBalanceType } from "@/shared/types/balance/balance";
import { AppDispatch } from "@/shared/store/store";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface StateType {
  amount: number;
}

const initialState = {
  amount: 0,
};

export const AccountSlice = createSlice({
  name: "AccountReducer",
  initialState,
  reducers: {
    setAmount: (state: StateType, action) => {
      state.amount = action.payload;
    },
  },
});

export const { setAmount } = AccountSlice.actions;

export default AccountSlice.reducer;

export const getAccounts =
  (token: string, context: string) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.marketdb.ru/v1/accounts",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const createNewAccount =
  (token: string, context: string, login: string, password: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: "https://api.marketdb.ru/v1/accounts",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          login: login,
          password: password,
        },
      };
      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };
