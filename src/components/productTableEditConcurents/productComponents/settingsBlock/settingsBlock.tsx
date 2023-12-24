import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import {
  Box,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  Avatar,
  useTheme
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { getStrategiesTypes, getStrategyId } from "@/shared/store/slices/reprice/repriceSlice";
import { AppState } from "@/shared/store/store";
import StrategiesCheck from "@/components/ui/strategiesCheck/strategiesCheck";
import ValuesSettings from "./ui/valuesSettings/valuesSettings";

const SettingsBlock = ({ getFirstData, item, open }: any) => {
  const [strategies, setStrategies] = useState([]);
  const [strategy, setStrategy] = useState({}) as any;
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataS, setDataS] = useState({ min: false, max: false, step: false, discount: false });

  const dispatch = useDispatch();
  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const repricer = useSelector((state: AppState) => state.repriceReducer) as any;

  const theme = useTheme();

  const getStrategyIdHandler = async () => {
    if (repricer.currentItem) {
      const strategyId = await dispatch(getStrategyId(company.activeCompany, repricer.currentItem));
      await setStrategy(strategyId);
      return await strategyId;
    }
  };

  const getProms = useCallback(async () => {
    if (repricer.currentItem) {
      setLoading(false);
      const types = await dispatch(getStrategiesTypes(company.activeCompany));
      setStrategies(types);
      const strategiData = await getStrategyIdHandler();
      if (strategiData?.strategyType) {
        setSelected(strategiData?.strategyType);
      }
      if (strategiData?.strategyType === "close_to_minimal") {
        setDataS({ min: true, max: true, step: true, discount: true });
      } else if (strategiData?.strategyType === "quantity_dependent") {
        setDataS({ min: true, max: true, step: true, discount: true });
      } else if (strategiData?.strategyType === "equal_price") {
        setDataS({ min: true, max: true, step: false, discount: true });
      } else {
        setSelected("");
        setDataS({ min: false, max: false, step: false, discount: false });
      }
      await setLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const changeStrategy = (value: any) => {
    setSelected(value);
    if (value === "close_to_minimal") {
      return setDataS({ min: true, max: true, step: true, discount: true });
    } else if (value === "quantity_dependent") {
      return setDataS({ min: true, max: true, step: true, discount: true });
    } else if (value === "equal_price") {
      return setDataS({ min: true, max: true, step: false, discount: true });
    } else {
      return setDataS({ min: false, max: false, step: false, discount: false });
    }
  };

  useEffect(() => {
    if (open === false) {
      setLoading(false);
      setSelected("");
      setStrategy({});
      setStrategies([]);
      setDataS({ min: false, max: false, step: false, discount: false });
    }
  }, [open]);

  useEffect(() => {
    if (repricer.currentItem && open === true) {
      getProms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repricer.currentItem]);

  const DisabledInputs = styled(CustomTextField)({
    WebkitTextFillColor: theme.palette.text.primary,
    color: theme.palette.text.primary
  });

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
            <DisabledInputs
              fullWidth
              id='minValue'
              name='minValue'
              type='string'
              value={item.name}
              disabled
            />
          </Box>
          <Grid style={{ width: "100%", display: "flex", gap: "32px" }} xs={12}>
            <Box width={"18% !important"}>
              <CustomFormLabel>ProductId</CustomFormLabel>
              <DisabledInputs
                fullWidth
                id='minValue'
                name='minValue'
                type='string'
                value={item.productId}
                disabled
              />
            </Box>
            <Box width={"18% !important"}>
              <CustomFormLabel>SkuId</CustomFormLabel>
              <DisabledInputs
                fullWidth
                id='minValue'
                name='minValue'
                type='string'
                value={item.skuId}
                disabled
              />
            </Box>
            <Box width={"54% !important"}>
              <CustomFormLabel>SkuTitle</CustomFormLabel>
              <DisabledInputs
                fullWidth
                id='minValue'
                name='minValue'
                type='string'
                value={item.skuTitle}
                disabled
              />
            </Box>
          </Grid>
          <Grid style={{ width: "100%", display: "flex", gap: "32px" }} xs={12}>
            <Box width={"30% !important"}>
              <CustomFormLabel>Цена товара</CustomFormLabel>
              <DisabledInputs
                fullWidth
                id='minValue'
                name='minValue'
                type='string'
                value={item.price + "руб."}
                disabled
              />
            </Box>
            <Box width={"65% !important"}>
              <CustomFormLabel>Barcode</CustomFormLabel>
              <DisabledInputs
                fullWidth
                id='minValue'
                name='minValue'
                type='string'
                value={item.barcode}
                disabled
              />
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
