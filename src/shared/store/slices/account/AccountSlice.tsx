import { TopUpBalanceType } from "@/shared/types/balance/balance";
import { AppDispatch } from "@/shared/store/store";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

interface StateType {
  amount: number;
  accounts: any;
}

const initialState = {
  amount: 0,
  accounts: []
};

export const AccountSlice = createSlice({
  name: "AccountReducer",
  initialState,
  reducers: {
    setAmount: (state: StateType, action) => {
      state.amount = action.payload;
    },
    setAccounts: (state: StateType, action) => {
      state.accounts = action.payload;
    },
  },
});

export const { setAmount, setAccounts } = AccountSlice.actions;

export default AccountSlice.reducer;

export const getAccounts =
  (token: string, context: string) => async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts`,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setAccounts(response.data)
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
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts`,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`,
        },
        data: {
          "login": login,
          "password": password,
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
