import axios from "../../../axios/axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { v4 as uuidv4 } from "uuid";

interface StateType {
  data: [];
}

const initialState = {
  data: [],
};

export const RepriceSlice = createSlice({
  name: "reprice",
  initialState,
  reducers: {
    getSubscription: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getSubscription } = RepriceSlice.actions;

export const getListAccounts =
  (token: string, context: string) => async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.ru/v1/accounts`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {})
        .catch((error) => {});
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const addNewAccount =
  (token: string, context: string, login: string, password: string) =>
  async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.ru/v1/accounts`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          login: "",
          password: "",
        },
      };
      axios
        .request(config)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getInfoAccount =
  (token: string, context: string, id: string) =>
  async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.ru/v1/accounts/${id}`,
        "X-Request-ID": `${uuidv4()}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const updateAccount =
  (
    token: string,
    context: string,
    login: string,
    password: string,
    id: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.ru/v1/accounts/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`,
        },
        body: {
          login: "",
          password: "",
        },
      };
      axios
        .request(config)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const deleteAccount =
  (token: string, context: string, id: string) =>
  async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.ru/v1/accounts/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`,
        },
      };
      axios
        .request(config)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getItemsShop =
  (token: string, context: string, id: string, shopId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/shops/${shopId}/items`,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`,
        },
      };
      return axios
        .request(config)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export default RepriceSlice.reducer;
