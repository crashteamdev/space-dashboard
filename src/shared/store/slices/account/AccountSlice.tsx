import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { addItem } from "../alerts/AlertsSlice";
import { AppDispatch } from "../../store";
import axiosApiInstance from "@/shared/api/api";

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
    }
  }
});

export const { setAmount, setAccounts } = AccountSlice.actions;

export default AccountSlice.reducer;

export const getAccounts = (token: string, context: string) => async () => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/space/v1/accounts`,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Request-ID": `${uuidv4()}`
      }
    };
    return axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getSubscription = (context: string) => async () => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/space/v1/user/subscription`
    };
    return axiosApiInstance
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return null;
      });
  } catch (err: any) {
    console.log(err);
  }
};

export const getAccount = (token: string, context: string, id: string) => async () => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Request-ID": `${uuidv4()}`
      }
    };
    return axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
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
        method: "post",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts`,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`
        },
        data: {
          login: login,
          password: password
        }
      };
      return axios
        .request(config)
        .then((response) => {
          setAccounts(response.data);
          dispatch(
            addItem({
              title: "Аккаунт был добавлен",
              status: "success",
              timelife: 4000,
              id: uuidv4()
            })
          );
          console.log(response.data);
          return response.data;
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
      const config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`
        }
      };
      axios
        .request(config)
        .then((response) => {
          dispatch(
            addItem({
              title: "Аккаунт был удален",
              status: "success",
              timelife: 4000,
              id: uuidv4()
            })
          );
          setAccounts(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getShops = (token: string, context: string, id: string) => async () => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/shops`,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Request-ID": `${uuidv4()}`
      }
    };
    return axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const syncAccount =
  (token: string, context: string, id: string) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/update`,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Request-ID": `${uuidv4()}`
        }
      };
      return axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          dispatch(
            addItem({
              title: "Синхронизация началась",
              description: "Попробуйте перезагрузить страницу или немного подождать",
              status: "info",
              timelife: 4000,
              id: uuidv4()
            })
          );
          return response.data;
        })
        .catch((error) => {
          if (error.response.status === 409) {
            dispatch(
              addItem({
                title: "Ошибка 409 - Конфликт",
                description: "Синхронизация началась, ожидайте пока она завершится",
                status: "error",
                timelife: 4000,
                id: uuidv4()
              })
            );
          }
          return error;
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getHistory = (token: string, context: string, id: string) => async () => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/price-history?limit=1000`
    };
    return axiosApiInstance
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const updateAccount =
  (context: string, login: string, password: string, id: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}`,
        data: {
          login: login,
          password: password
        }
      };
      axiosApiInstance
        .request(config)
        .then((response) => {
          dispatch(
            addItem({
              title: "Данные для аккаунта были обновлены",
              status: "success",
              timelife: 4000,
              id: uuidv4()
            })
          );
          setAccounts(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          dispatch(
            addItem({
              title: `Ошибка ${error.response.status}`,
              status: "error",
              timelife: 4000,
              id: uuidv4()
            })
          );
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };
