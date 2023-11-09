import axios from "../../../axios/axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";

interface StateType {
  data: []
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
        .then((response) => {
        })
        .catch((error) => {
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const addNewAccount =
  (token: string, context: string, login: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.ru/v1/accounts`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          login: '',
          password: ''
        }
      };
      axios
        .request(config)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getInfoAccount =
  (token: string, context: string, id: string) => async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.ru/v1/accounts/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const updateAccount =
  (token: string, context: string, login: string, password: string, id: string) => async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.ru/v1/accounts/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          login: '',
          password: ''
        }
      };
      axios
        .request(config)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  

export const deleteAccount =
  (token: string, context: string, id: string) => async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://api.marketdb.ru/v1/accounts/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export default RepriceSlice.reducer;
