import axios from "../../../axios/axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  token: "",
  subscription: {
    active: false,
    createdAt: "",
    endAt: "",
    type: "default", // default, advanced, pro
    typeNumeric: 1 // 1, 2, 3
  },
  paymentList: []
};

export const UserProfileSlice = createSlice({
  name: "UserPost",
  initialState,
  reducers: {
    getTokens: (state, action) => {
      state.token = action.payload;
    },
    getSubscription: (state, action) => {
      state.subscription = action.payload;
    },
    setPaymentList: (state, action) => {
      state.paymentList = action.payload;
    }
  }
});

export const { getTokens, getSubscription, setPaymentList } = UserProfileSlice.actions;

export const fetchToken = (token: string, context: string) => async (dispatch: AppDispatch) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/v1/user/api-key`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    axios
      .request(config)
      .then((response) => {
        dispatch(getTokens(response.data));
      })
      .catch(() => {
        dispatch(getTokens(""));
      });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const fetchRefreshToken =
  (token: string, context: string) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/v1/user/api-key`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      axios
        .request(config)
        .then((response) => {
          dispatch(getTokens(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const fetchGenerateToken =
  (token: string, context: string) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/v1/user/api-key`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      axios
        .request(config)
        .then((response) => {
          dispatch(getTokens(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const fetchProfileStatus =
  (token: string, context: string) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/v1/user/subscription`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      axios
        .request(config)
        .then((response) => {
          console.log("CONFIG", config, "DATA", response.data);
          dispatch(getSubscription(response.data));
        })
        .catch((error) => {
          if (error === "Wrong Services") {
            console.log(error);
            dispatch(getSubscription({}));
          }
        });
    } catch (err: any) {
      console.log(err);
    }
  };

export const getListPayments =
  (token: string, context: string, fromDate: string, toDate: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.pro/gateway/payments?fromDate=${fromDate}&toDate=${toDate} `,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`
        },
        data: {
          fromDate: fromDate,
          toDate: toDate
        }
      };
      axios
        .request(config)
        .then((response) => {
          dispatch(setPaymentList(response.data));
        })
        .catch(() => {});
    } catch (err: any) {
      throw new Error(err);
    }
  };

export default UserProfileSlice.reducer;
