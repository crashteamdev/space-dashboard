import { TopUpBalanceType } from "@/shared/types/balance/balance";
import { AppDispatch } from "@/shared/store/store";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { addItem } from "../alerts/AlertsSlice";

interface StateType {
  amount: number;
  linkPayment: string;
  resultPromo: string;
  exchange: number;
  selectTarif: {
    title: string;
    amount: number;
    context: string;
    plan: string;
    promoCode: string;
    multiply: number;
  };
}

const initialState = {
  amount: 0,
  linkPayment: "",
  resultPromo: "",
  exchange: 0,
  selectTarif: {
    title: "",
    amount: 0,
    context: "",
    plan: "",
    promoCode: "",
    multiply: 0
  }
};

export const BalanceSlice = createSlice({
  name: "balanceReducer",
  initialState,
  reducers: {
    setAmount: (state: StateType, action) => {
      state.amount = action.payload;
    },
    setLinkPayment: (state: StateType, action) => {
      state.linkPayment = action.payload;
    },
    setResultPromo: (state: StateType, action) => {
      state.resultPromo = action.payload;
    },
    setExchange: (state: StateType, action) => {
      state.exchange = action.payload;
    },
  },
});

export const { setAmount, setLinkPayment, setResultPromo, setExchange } = BalanceSlice.actions;

export default BalanceSlice.reducer;

export const getBalance =
  (token: string) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.marketdb.pro/gateway/payments/user/balance",
        headers: {
          "Authorization": `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
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
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.marketdb.pro/gateway/payments",
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
      const data = JSON.stringify({
        "amount": +amount,
        "successRedirectUrl": "https://space.marketdb.pro/payment/success",
        "failRedirectUrl": "https://space.marketdb.pro/payment/error",
        "provider": {
          "provider": provider.toLowerCase()
        }
      });
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.marketdb.pro/gateway/payments/topup",
        headers: {
          "Authorization": `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`,
          "Content-Type": "application/json",
        },
        data: data
      };
      axios.request(config)
        .then((response) => {
          console.log(response);
          if (response.data.payment.status === "failed") {
            dispatch(addItem({title: "Не удалось создать платежную ссылку", status: "error", timelife: 4000, id: uuidv4()}));
          }
          dispatch(
            addItem({
              title: "Ожидайте",
              description: "Происходит редирект на страницу оплаты",
              status: "info",
              timelife: 4000,
              id: uuidv4(),
            })
          );
          dispatch(setLinkPayment(response.data.redirectUrl));
        })
        .catch((error) => {
          console.log(error);
          dispatch(addItem({title: "Ошибка", description: error.response.status, status: "error", timelife: 4000, id: uuidv4()}));
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const purchaseService =
  (
    token: string,
    serviceContext: string,
    plan: string,
    promoCode: string,
    multiply: number,
    provider: string,
    method: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const data = JSON.stringify({
        "service": {
          "context": serviceContext,
          "plan": plan,
        },
        "multiply": multiply,
        "method": "from-balance",
      });
      const dataOneTime = JSON.stringify({
        "service": {
          "context": serviceContext,
          "plan": plan,
        },
        "promoCode": promoCode,
        "multiply": multiply,
        "method": method,
        "provider": {
          "provider": provider,
        },
        "successRedirectUrl": "https://space.marketdb.pro/payment/success",
        "failRedirectUrl": "https://space.marketdb.pro/payment/error",
      });
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.marketdb.pro/gateway/payments/purchase",
        headers: {
          "Authorization": `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`,
          "Content-Type": "application/json",
        },
        data: method === "one-time" ? dataOneTime : data,
      };
      axios
        .request(config)
        .then((response) => {
          if (response.data.payment.status === "failed") {
            dispatch(addItem({title: "Не удалось создать платежную ссылку", status: "error", timelife: 4000, id: uuidv4()}));
            return null;
          }
          dispatch(
            addItem({
              title: "Ожидайте",
              description: "Происходит редирект на страницу оплаты",
              status: "info",
              timelife: 4000,
              id: uuidv4(),
            })
          );
          if (method === "one-time") {
            dispatch(setLinkPayment(response.data.redirectUrl));
          } else {
            dispatch(setAmount(response.data.balance));
          }
          
        })
        .catch((error) => {
          console.log(error.response.status === 422);
          if (error.response.status === 422) {
            dispatch(addItem({title: "На вашем аккаунте не достаточно средств для покупки тарифа", status: "error", timelife: 4000, id: uuidv4()}));
          }
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  export const checkPromoCode =
    (token: string, promoCode: string, context: string) =>
    async (dispatch: AppDispatch) => {
      try {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `https://api.marketdb.pro/gateway/promo-code/${promoCode}/check`,
          headers: {
            "Authorization": `Bearer ${token}`,
            "X-Request-ID": `${uuidv4()}`,
          },
        };
        axios
          .request(config)
          .then((response) => {
            dispatch(setResultPromo(response.data.code));
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err: any) {
        throw new Error(err);
      }
    };

export const getExchange =
  (token: string, currency: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.pro/gateway/exchange-rate?currency=${currency}`,
        headers: {
          "Authorization": `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          dispatch(setExchange(response.data.exchangeRate));
          return response.data.exchangeRate;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };
