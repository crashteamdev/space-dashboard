import axios from "../../../axios/axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { v4 as uuidv4 } from "uuid";

// interface StateType {
//   token: string;
//   subscription: {
//     active: boolean;
//     createdAt: string;
//     endAt: string;
//     type: string;
//     typeNumeric: number;
//   };
//   paymentList: [
//     {
//       paymentId: string,
//       status: string,
//       amount: number,
//       createdAt: string,
//     }
//   ]
// }

const initialState = {
  token: "",
  subscription: {
    active: false,
    createdAt: "",
    endAt: "",
    type: "default", // default, advanced, pro
    typeNumeric: 1, // 1, 2, 3
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
    },
  },
});

export const { getTokens, getSubscription, setPaymentList } = UserProfileSlice.actions;

export const fetchToken =
  (token: string, context: string) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/v1/user/api-key`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
          Authorization: `Bearer ${token}`,
        },
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
          Authorization: `Bearer ${token}`,
        },
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
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          dispatch(getSubscription(response.data));
        })
        .catch(() => {});
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getListPayments =
  (token: string, context: string, fromDate: string, toDate: string) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.marketdb.pro/gateway/payments",
        headers: {
          "Authorization": `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`,
        },
        data: {
          fromDate: fromDate,
          toDate: toDate,
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
