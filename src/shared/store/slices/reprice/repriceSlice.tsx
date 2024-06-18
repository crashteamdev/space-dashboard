import axiosApiInstance from "@/shared/api/api";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { addItem } from "../alerts/AlertsSlice";
import { AppDispatch } from "@/shared/store/store";

const initialState = {
  data: [],
  currentItem: ""
};

export const RepriceSlice = createSlice({
  name: "reprice",
  initialState,
  reducers: {
    getSubscription: (state, action) => {
      state.data = action.payload;
    },
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    }
  }
});

export const { getSubscription, setCurrentItem } = RepriceSlice.actions;

export const getItemsShop =
  (token: string, context: string, id: string, shopId: string) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/shops/${shopId}/items?limit=10000`
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            addItem({
              title: `Ошибка ${error.response.status}`,
              status: "error",
              timelife: 4000,
              id: uuidv4()
            })
          );
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getItemsFilteredShop =
(token: string, context: string, id: string, shopId: string, filter: any) => async (dispatch: AppDispatch) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/shops/${shopId}/items?limit=1000${filter ? filter : ""}`
    };
    return axiosApiInstance
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          addItem({
            title: `Ошибка ${error.response.status}`,
            status: "error",
            timelife: 4000,
            id: uuidv4()
          })
        );
      });
  } catch (err: any) {
    throw new Error(err);
  }
};

  export const getItemsInPoolShop =
  (token: string, context: string, id: string, shopId: string, filter: any) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/shops/${shopId}/pool-items?limit=1000${filter ? filter : ""}`
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            addItem({
              title: `Ошибка ${error.response.status}`,
              status: "error",
              timelife: 4000,
              id: uuidv4()
            })
          );
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getCompetitiveProducts =
  (token: string, context: string, id: string, shopId: string, shopItemId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/shops/${shopId}/items/${shopItemId}/similar`
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            addItem({
              title: `Ошибка ${error.response.status}`,
              status: "error",
              timelife: 4000,
              id: uuidv4()
            })
          );
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getCompetitiveProductsAdds =
  (token: string, context: string, id: string, shopId: string, shopItemId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/shops/${shopId}/items/${shopItemId}/competitor-items?limit=1000`
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            addItem({
              title: `Ошибка ${error.response.status}`,
              status: "error",
              timelife: 4000,
              id: uuidv4()
            })
          );
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getItemShop =
  (token: string, context: string, id: string, shopId: string) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/items/${shopId}?limit=1000`
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            addItem({
              title: `Ошибка ${error.response.status}`,
              status: "error",
              timelife: 4000,
              id: uuidv4()
            })
          );
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const patchParamsItem =
  (token: string, context: string, id: string, itemId: string, data: any) =>
  async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/items/${itemId}`,
        data: {
          minimumThreshold: data.minimumThreshold,
          maximumThreshold: data.maximumThreshold,
          step: data.step,
          discount: data.discount
        }
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          dispatch(
            addItem({
              title: "Данные сохранены",
              status: "success",
              timelife: 4000,
              id: uuidv4()
            })
          );
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            addItem({
              title: `Ошибка ${error.response.status}`,
              status: "error",
              timelife: 4000,
              id: uuidv4()
            })
          );
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };
export const addComcurentItem =
  (token: string, context: string, id: string, data: any) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/shop-item-competitor`,
        data: {
          shopItemRef: {
            shopId: data.shopItemRef.shopId,
            shopItemId: data.shopItemRef.shopItemId
          },
          url: data.url,
          competitorProductId: data.competitorProductId,
          competitorSkuId: data.competitorSkuId
        }
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          dispatch(
            addItem({
              title: "Конкурент был добавлен в таблицу",
              status: "success",
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
                title: `Ошибка ${error.response.status}`,
                description: "Достигнуто максимальное кол-во конкурентных товаров",
                status: "error",
                timelife: 4000,
                id: uuidv4()
              })
            );
          } else if (error.response.status === 403) {
            dispatch(
              addItem({
                title: "Вы достигли лимита добавления конкурентов к товару",
                status: "error",
                timelife: 4000,
                id: uuidv4()
              })
            );
          } else {
            dispatch(
              addItem({
                title: `Ошибка ${error.response.status}`,
                status: "error",
                timelife: 4000,
                id: uuidv4()
              })
            );
          }
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const deleteConcurentItem =
  (token: string, context: string, id: string, data: any) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/shop-item-competitor`,
        data: {
          shopItemId: data.shopItemId,
          competitorId: data.competitorId
        }
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          dispatch(
            addItem({
              title: "Конкурент был удален из таблицы",
              status: "success",
              timelife: 4000,
              id: uuidv4()
            })
          );
          return response.data;
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
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };
export const addItemInPull =
  (token: string, context: string, id: string, data: any) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/pool-items`,
        data: {
          shopId: data.shopId,
          shopItemId: data.shopItemId
        }
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          dispatch(
            addItem({
              title: "Выбранные товары добавлены в пул",
              status: "success",
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
                title: `Ошибка ${error.response.status}`,
                description: "Достигнуто максимальное кол-во товаров в пуле",
                status: "error",
                timelife: 4000,
                id: uuidv4()
              })
            );
          } else {
            dispatch(
              addItem({
                title: `Ошибка ${error.response.status}`,
                status: "error",
                timelife: 4000,
                id: uuidv4()
              })
            );
          }
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };
  
export const addItemsInPull =
(token: string, context: string, id: string, data: any) => async (dispatch: AppDispatch) => {
  try {
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/pool-items/bulk`,
      data: {
        shopId: data.shopId,
        shopItemIds: data.shopItemIds
      }
    };
    return axiosApiInstance
      .request(config)
      .then((response) => {
        dispatch(
          addItem({
            title: "Товар добавлен в пул",
            status: "success",
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
              title: `Ошибка ${error.response.status}`,
              description: "Достигнуто максимальное кол-во товаров в пуле",
              status: "error",
              timelife: 4000,
              id: uuidv4()
            })
          );
        } else {
          dispatch(
            addItem({
              title: `Ошибка ${error.response.status}`,
              status: "error",
              timelife: 4000,
              id: uuidv4()
            })
          );
        }
      });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const removeItemsInPull =
(token: string, context: string, id: string, data: any) => async (dispatch: AppDispatch) => {
  try {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/pool-items/bulk`,
      data: {
        shopId: data.shopId,
        shopItemIds: data.shopItemIds
      }
    };
    return axiosApiInstance
      .request(config)
      .then((response) => {
        dispatch(
          addItem({
            title: "Выбранные товары удалены из пула",
            status: "success",
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
              title: `Ошибка ${error.response.status}`,
              description: "Достигнуто максимальное кол-во товаров в пуле",
              status: "error",
              timelife: 4000,
              id: uuidv4()
            })
          );
        } else {
          dispatch(
            addItem({
              title: `Ошибка ${error.response.status}`,
              status: "error",
              timelife: 4000,
              id: uuidv4()
            })
          );
        }
      });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const deleteItemInPull =
  (token: string, context: string, id: string, data: any) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/pool-items`,
        data: {
          shopId: data.shopId,
          shopItemId: data.shopItemId
        }
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          dispatch(
            addItem({
              title: "Товар был удален из пула",
              status: "success",
              timelife: 4000,
              id: uuidv4()
            })
          );
          return response.data;
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
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const changeMonitoringAccount =
  (token: string, context: string, id: string, data: any) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/accounts/${id}/monitor`,
        data: {
          state: data.state
        }
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          dispatch(
            addItem({
              title: "Cостояние мониторинга аккаунта - изменено",
              status: "success",
              timelife: 4000,
              id: uuidv4()
            })
          );
          return response.data;
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
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getStrategiesTypes = (context: string) => async (dispatch: AppDispatch) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/space/v1/strategies/types`
    };
    return axiosApiInstance
      .request(config)
      .then((response) => {
        return response.data;
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
      });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getStrategyId = (context: string, idItem: any) => async (dispatch: AppDispatch) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/space/v1/strategies/${idItem}`
    };
    return axiosApiInstance
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500 ) {
          dispatch(
            addItem({
              title: `Ошибка ${error.response.status}`,
              status: "error",
              timelife: 4000,
              id: uuidv4()
            })
          );
        }
      });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const addStrategyId =
  (context: string, idItem: any, data: any) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/strategies`,
        data: {
          accountShopItemId: idItem,
          strategy: {
            step: data.step ? data.step : null,
            strategyType: data.strategyType,
            minimumThreshold: data.minimumThreshold,
            maximumThreshold: data.maximumThreshold,
            discount: data.discount ? data.discount : 0,
            competitorAvailableAmount: data.competitorAvailableAmount !== 0 ? data.competitorAvailableAmount : null,
            competitorSalesAmount: data.competitorSalesAmount !== 0 ? data.competitorSalesAmount : null,
            changeNotAvailableItemPrice: data.changeNotAvailableItemPrice === "true" ? true : null,
          }
        }
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          dispatch(
            addItem({
              title: "Стратегия была добавлена к товару",
              status: "success",
              timelife: 4000,
              id: uuidv4()
            })
          );
          return response.data;
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
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  export const editStrategyId =
  (context: string, itemId: any, data: any) => async (dispatch: AppDispatch) => {
    try {
      console.log(data);
      const config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/strategies/${itemId}`,
        data: {
          strategy: {
            step: data.step ? data.step : null,
            strategyType: data.strategyType,
            minimumThreshold: data.minimumThreshold,
            maximumThreshold: data.maximumThreshold,
            discount: data.discount ? data.discount : 0,
            competitorAvailableAmount: data.competitorAvailableAmount !== 0 ? data.competitorAvailableAmount : null,
            competitorSalesAmount: data.competitorSalesAmount !== 0 ? data.competitorSalesAmount : null,
            changeNotAvailableItemPrice: data.changeNotAvailableItemPrice === "true" ? true : null,
          }
        }
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          dispatch(
            addItem({
              title: "Данные изменены и сохранены",
              status: "success",
              timelife: 4000,
              id: uuidv4()
            })
          );
          return response.data;
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
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const deleteStrategyId =
  (context: string, itemId: any) => async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/space/v1/strategies/${itemId}`,
      };
      return axiosApiInstance
        .request(config)
        .then((response) => {
          dispatch(
            addItem({
              title: "Стратегия была удалена",
              status: "success",
              timelife: 4000,
              id: uuidv4()
            })
          );
          return response.data;
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
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export default RepriceSlice.reducer;
