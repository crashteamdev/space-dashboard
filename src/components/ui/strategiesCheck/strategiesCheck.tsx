import React from "react";
import { Box, Button, MenuItem } from "@mui/material";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import CustomSelect from "../theme-elements/CustomSelect";
import CustomTextField from "../theme-elements/CustomTextField";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { deleteStrategyId } from "@/shared/store/slices/reprice/repriceSlice";
import { AppState } from "@/shared/store/store";

const StrategiesCheck = ({ strategy, selected, setSelected, strategies }: any) => {
  console.log(strategy);

  const dispatch = useDispatch();
  const company = useSelector((state: AppState) => state.companyChanger) as any;
  
  const deleteStrategy = () => {
    dispatch(deleteStrategyId(company.activeCompany, strategy.id));
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
                {item}
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
          value={strategy?.strategyType}
          disabled
        />
      </Box>
      <Button onClick={() => deleteStrategy()} color='secondary'>
        Удалить стратегию
      </Button>
    </Box>
  );
};

export default StrategiesCheck;
