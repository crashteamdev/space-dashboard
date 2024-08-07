import React from "react";
import { Box, MenuItem } from "@mui/material";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import CustomSelect from "../theme-elements/CustomSelect";
import CustomTextField from "../theme-elements/CustomTextField";
import { useSelector } from "@/shared/store/hooks";
import { useDispatch as useReduxDispatch } from "react-redux";
import { deleteStrategyId } from "@/shared/store/slices/reprice/repriceSlice";
import { AppState } from "@/shared/store/store";
import { AppButton } from "@/shared/components/AppButton";

const StrategiesCheck = ({ getProms, item, strategy, selected, setSelected, strategies }: any) => {

  const dispatch = useReduxDispatch();
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const checkStrategy = (value: string) => {
    if (value === "close_to_minimal") {
      return "Цена ниже конкурента";
    } else if (value === "equal_price") {
      return "Цена равная цене конкурента";
    } else if (value === "quantity_dependent") {
      return "Зависит от количества";
    }
  };
  
  const deleteStrategy = async () => {
    await dispatch(deleteStrategyId(company.activeCompany, item.id));
    await getProms();
    setSelected("");
  };

  return !strategy?.strategyType ? (
    <Box mb={2} display={"flex"} flexDirection={"column"}>
      <CustomFormLabel htmlFor='demo-simple-select'>Выберите стратегию</CustomFormLabel>
      <CustomSelect
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={strategy?.strategyType || selected}
        onChange={(e: any) => setSelected(e.target.value)}
        fullWidth
      >
        {strategies.map((item: any, index: number) => {
          return (
            <MenuItem key={index} value={`${item}`}>
              <Box display={"flex"} alignItems={"center"}>
                {checkStrategy(item)}
              </Box>
            </MenuItem>
          );
        })}
      </CustomSelect>
    </Box>
  ) : (
    <Box mb={2} display={"flex"} flexDirection={"column"} gap={"16px"}>
      <Box>
        <CustomFormLabel>Ваша стратегия</CustomFormLabel>
        <CustomTextField
          fullWidth
          id='minValue'
          name='minValue'
          type='string'
          value={checkStrategy(strategy?.strategyType)}
          disabled
        />
      </Box>
      <AppButton tag="button" className="!py-3 text-center flex justify-center" onClick={() => deleteStrategy()} color='secondary'>
        Удалить стратегию
      </AppButton>
    </Box>
  );
};

export default StrategiesCheck;
