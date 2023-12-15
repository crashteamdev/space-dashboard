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
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { getStrategiesTypes, getStrategyId } from "@/shared/store/slices/reprice/repriceSlice";
import { AppState } from "@/shared/store/store";
import StrategiesCheck from "@/components/ui/strategiesCheck/strategiesCheck";
import ValuesSettings from "./ui/valuesSettings/valuesSettings";

const SettingsBlock = ({ getFirstData, item }: any) => {
  const [strategies, setStrategies] = useState([]);
  const [strategy, setStrategy] = useState({}) as any;
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataS, setDataS] = useState({ min: false, max: false, step: false, discount: false });

  const dispatch = useDispatch();
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const theme = useTheme();
  const getProms = async () => {
    const strategyId = await dispatch(getStrategyId(company.activeCompany, item.id));
    const strategies = await dispatch(getStrategiesTypes(company.activeCompany));
    await setStrategy(strategyId);
    setStrategies(strategies);
    setLoading(true);
    if (strategyId?.strategyType === "close_to_minimal") {
      return setDataS({ min: true, max: true, step: true, discount: true });
    } else if (strategyId?.strategyType === "quantity_dependent") {
      return setDataS({ min: true, max: true, step: true, discount: true });
    } else if (strategyId?.strategyType === "equal_price") {
      return setDataS({ min: true, max: true, step: false, discount: true });
    }
    if (strategyId?.strategyType) {
      setSelected(strategyId?.strategyType);
    }
  };

  const changeStrategy = (value: any) => {
    setSelected(value);
    if (value === "close_to_minimal") {
      return setDataS({ min: true, max: true, step: true, discount: true });
    } else if (value === "quantity_dependent") {
      return setDataS({ min: true, max: true, step: true, discount: true });
    } else if (value === "equal_price") {
      return setDataS({ min: true, max: true, step: false, discount: true });
    }
  };

  useEffect(() => {
    if (item) {
      getProms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const DisabledInputs = styled(CustomTextField)({
    WebkitTextFillColor: theme.palette.text.primary,
    color: theme.palette.text.primary
  });

  return (
    item && (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <DialogTitle mt={2}>Настройки товара</DialogTitle>
            <DialogContentText mx={3}>Изменяйте цены для товара</DialogContentText>
          </Box>
        </Box>
        <Grid display={"flex"} mx={3} xs={12}>
          <Grid mt={4} xs={2}>
            <Box
              sx={{ position: "relative", width: "128px !important", height: "128px !important" }}
            >
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
              item={item}
              selected={selected}
              setSelected={changeStrategy}
              strategies={strategies}
            />
          )}
        </Grid>
        {loading ? (
          <ValuesSettings
            strategy={strategy}
            selected={selected}
            getFirstData={getFirstData}
            item={item}
            dataS={dataS}
          />
        ) : (
          <Grid item mx={3} mt={4} xs={12}>
            Загрузка...
          </Grid>
        )}
      </>
    )
  );
};

export default SettingsBlock;
