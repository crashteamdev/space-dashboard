import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import {
  Box,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  Avatar
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "@/shared/store/hooks";
import { useDispatch as useReduxDispatch } from "react-redux";
import { getStrategiesTypes, getStrategyId } from "@/shared/store/slices/reprice/repriceSlice";
import { AppState } from "@/shared/store/store";
import StrategiesCheck from "@/components/ui/strategiesCheck/strategiesCheck";
import ValuesSettings from "./ui/valuesSettings/valuesSettings";

const SettingsBlock = ({ getFirstData, item, open }: any) => {
  const [strategies, setStrategies] = useState() as any;
  const [strategy, setStrategy] = useState({}) as any;
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataS, setDataS] = useState({ 
    min: false, 
    max: false, 
    step: false, 
    discount: false,
    competitorAvailableAmount: false,
    competitorSalesAmount: false,
    changeNotAvailableItemPrice: false
  });

  const dispatch = useReduxDispatch();
  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const repricer = useSelector((state: AppState) => state.repriceReducer) as any;

  const getStrategyIdHandler = async () => {
    if (repricer.currentItem) {
      const strategyId = await dispatch(getStrategyId(company.activeCompany, repricer.currentItem));
      await setStrategy(strategyId);
      return strategyId;
    }
  };

  const getTypes = async () => {
    if (repricer.currentItem) {
      const strategies = await dispatch(getStrategiesTypes(company.activeCompany));
      setStrategies(strategies);
    }
  };

  const getProms = useCallback(async () => {
    if (repricer.currentItem) {
      setLoading(false);
      const strategiData = await getStrategyIdHandler() as any;
      if (strategiData?.strategyType) {
        setSelected(strategiData?.strategyType);
      }
      if (strategiData?.strategyType === "close_to_minimal") {
        setDataS({ min: true, max: true, step: true, discount: true, competitorAvailableAmount: true, competitorSalesAmount: true, changeNotAvailableItemPrice: true });
      } else if (strategiData?.strategyType === "quantity_dependent") {
        setDataS({ min: true, max: true, step: true, discount: true, competitorAvailableAmount: true, competitorSalesAmount: true, changeNotAvailableItemPrice: true });
      } else if (strategiData?.strategyType === "equal_price") {
        setDataS({ min: true, max: true, step: false, discount: true, competitorAvailableAmount: true, competitorSalesAmount: true, changeNotAvailableItemPrice: true });
      } else {
        setSelected("");
        setStrategy({});
        setDataS({ min: false, max: false, step: false, discount: false, competitorAvailableAmount: false, competitorSalesAmount: false, changeNotAvailableItemPrice: false });
      }
      setLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const changeStrategy = (value: any) => {
    setSelected(value);
    if (value === "close_to_minimal") {
      return setDataS({ min: true, max: true, step: true, discount: true, competitorAvailableAmount: true, competitorSalesAmount: true, changeNotAvailableItemPrice: true });
    } else if (value === "quantity_dependent") {
      return setDataS({ min: true, max: true, step: true, discount: true, competitorAvailableAmount: true, competitorSalesAmount: true, changeNotAvailableItemPrice: true  });
    } else if (value === "equal_price") {
      return setDataS({ min: true, max: true, step: false, discount: true, competitorAvailableAmount: true, competitorSalesAmount: true, changeNotAvailableItemPrice: true  });
    } else {
      return setDataS({ min: false, max: false, step: false, discount: false, competitorAvailableAmount: true, competitorSalesAmount: true, changeNotAvailableItemPrice: true  });
    }
  };

  useEffect(() => {
    if (open === false) {
      setLoading(false);
      setSelected("");
      setStrategy({});
      setDataS({ min: false, max: false, step: false, discount: false, competitorAvailableAmount: false, competitorSalesAmount: false, changeNotAvailableItemPrice: false });
    }
  }, [open]);

  useEffect(() => {
    if (repricer.currentItem) {
      getProms();
      getTypes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repricer.currentItem]);

  return loading ? (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <DialogTitle mt={2}>Настройки товара</DialogTitle>
          <DialogContentText mx={3}>Изменяйте цены для товара</DialogContentText>
        </Box>
      </Box>
      <Grid display={"flex"} mx={3} xs={12}>
        <Grid mt={4} xs={2}>
          <Box sx={{ position: "relative", width: "128px !important", height: "128px !important" }}>
            <Avatar
              src={`https://image.kazanexpress.ru/${item.photoKey}/t_product_high.jpg`}
              alt='product'
              sx={{ width: 128, height: 128 }}
            />
          </Box>
        </Grid>
        <Grid style={{ width: "100%" }} ml={3} xs={12}>
          <Box width={"100% !important"}>
            <CustomFormLabel>Название товара</CustomFormLabel>
            <div className="border-b border-black-800 py-1">{item.name}</div>
          </Box>
          <Grid style={{ width: "100%", display: "flex", gap: "32px" }} xs={12}>
            <Box width={"12% !important"}>
              <CustomFormLabel>ProductId</CustomFormLabel>
              <div className="border-b border-black-800 py-1">{item.productId}</div>
            </Box>
            <Box width={"12% !important"}>
              <CustomFormLabel>SkuId</CustomFormLabel>
              <div className="border-b border-black-800 py-1">{item.skuId}</div>
            </Box>
            <Box width={"54% !important"}>
              <CustomFormLabel>SkuTitle</CustomFormLabel>
              <div className="border-b border-black-800 py-1">{item.skuTitle}</div>
            </Box>
          </Grid>
          <Grid style={{ width: "100%", display: "flex", gap: "32px" }} xs={12}>
            <Box width={"30% !important"}>
              <CustomFormLabel>Цена товара</CustomFormLabel>
              <div className="border-b border-black-800 py-1">{item.price + (company.activeCompany === "ke" ? "руб" : "сум")}</div>
            </Box>
            <Box width={"65% !important"}>
              <CustomFormLabel>Barcode</CustomFormLabel>
              <div className="border-b border-black-800 py-1">{item.barcode}</div>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item mx={3} mt={4} xs={12}>
        <Divider sx={{ mx: "-24px" }} />
        <Typography variant='h6' mt={2}>
          Стратегии
        </Typography>
        {loading && (
          <StrategiesCheck
            strategy={strategy}
            getProms={getProms}
            item={item}
            selected={selected}
            setSelected={changeStrategy}
            strategies={strategies}
          />
        )}
      </Grid>
      <ValuesSettings
        strategy={strategy}
        selected={selected}
        getFirstData={getFirstData}
        getStrategyIdHandler={getStrategyIdHandler}
        item={item}
        dataS={dataS}
      />
    </>
  ) : (
    <Grid item mx={3} mt={4} xs={12}>
      Загрузка...
    </Grid>
  );
};

export default SettingsBlock;
