import { TopUpBalanceType } from "@/app/(DashboardLayout)/types/balance/balance";
import { AppDispatch } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    setAmount: (state : StateType, action) => {
      state.amount = action.payload;
    },
  },
});

export const { setAmount } = BalanceSlice.actions;

export default BalanceSlice.reducer;

export const getBalance = (token: string, context: string) => async (dispatch: AppDispatch) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/v1/payments/user/balance`,
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

export const getListPayments = (token: string, context: string) => async (dispatch: AppDispatch) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/v1/payments`,
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

export const topUpBalance = (token: string, context: string, amount: number, provider: 'freekassa') => async (dispatch: AppDispatch) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/v1/payments`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        amount: amount,
        successRedirectUrl: '/payment/success',
        failRedirectUrl: '/payment/error',
        provider: {
          provider: provider
        },
      }
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

export const purchaseService = (token: string, context: string, serviceContext: string, promoCode: string, multiply: string, provider: 'freekassa', method: string) => async (dispatch: AppDispatch) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/v1/payments`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        service: {
          context: serviceContext,
          plan: "default"
        },
        promoCode: promoCode,
        multiply: multiply,
        provider: {
          provider: provider,
        },
        method: method
      }
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

export const checkPromoCode = (token: string, promoCode: string, context: string) => async (dispatch: AppDispatch) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/v1/payments`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        code: promoCode,
      }
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
