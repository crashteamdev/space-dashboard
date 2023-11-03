import { TopUpBalanceType } from "@/shared/types/balance/balance";
import { AppDispatch } from "@/shared/store/store";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
interface StateType {
  amount: number;
}

const initialState = {
  amount: 0,
};

export const BalanceSlice = createSlice({
  name: "balanceReducer",
  initialState,
  reducers: {
    setAmount: (state: StateType, action) => {
      state.amount = action.payload;
    },
  },
});

export const { setAmount } = BalanceSlice.actions;

export default BalanceSlice.reducer;

export const getBalance =
  (token: string) => async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.pro/gateway/payments/user/balance`,
        headers: {
          "Authorization": `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          dispatch(setAmount(response.data.amount));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getListPayments =
  (token: string, context: string) => async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.pro/gateway/payments`,
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

export const topUpBalance =
  (token: string, context: string, amount: number, provider: string) =>
  async (dispatch: AppDispatch) => {
    try {
      console.log(amount, provider)
      let data = JSON.stringify({
        "amount": +amount,
        "successRedirectUrl": "/payment/success",
        "failRedirectUrl": "/payment/error",
        "provider": {
          "provider": `${provider}`
        }
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://api.marketdb.pro/gateway/payments/topup`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Request-ID': `${uuidv4()}`,
          'Content-Type': "application/json",
        },
        data: data
      };
      console.log(config);
      axios.request(config)
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const purchaseService =
  (
    token: string,
    context: string,
    serviceContext: string,
    promoCode: string,
    multiply: string,
    provider: "freekassa",
    method: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.pro/gateway/payments`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          service: {
            context: serviceContext,
            plan: "default",
          },
          promoCode: promoCode,
          multiply: multiply,
          provider: {
            provider: provider,
          },
          method: method,
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

export const checkPromoCode =
  (token: string, promoCode: string, context: string) =>
  async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.pro/gateway/promo-code/${promoCode}/check`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Request-ID': `${uuidv4()}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };
