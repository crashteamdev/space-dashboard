import axios from "../../../axios/axios";
import { createSlice } from "@reduxjs/toolkit";
import { map } from "lodash";
import { AppDispatch } from "../../store";

const API_URL = "/api/data/postData";

interface StateType {
  token: string;
  subscription: {
    active: boolean;
    createdAt: string;
    endAt: string;
    type: string;
    typeNumeric: number;
  };
}

const initialState = {
  token: "",
  subscription: {
    active: false,
    createdAt: "",
    endAt: "",
    type: "default", // default, advanced, pro
    typeNumeric: 1, // 1, 2, 3
  },
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
  },
});

export const { getTokens, getSubscription } = UserProfileSlice.actions;

export const fetchToken =
  (token: string, context: string) => async (dispatch: AppDispatch) => {
    try {
      let config = {
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
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const fetchRefreshToken =
  (token: string, context: string) => async (dispatch: AppDispatch) => {
    try {
      let config = {
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
      let config = {
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
      let config = {
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
        .catch((error) => {});
    } catch (err: any) {
      throw new Error(err);
    }
  };

export default UserProfileSlice.reducer;
