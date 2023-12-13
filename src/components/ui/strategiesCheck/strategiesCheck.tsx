import React from "react";
import { Box, MenuItem } from "@mui/material";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import CustomSelect from "../theme-elements/CustomSelect";

const StrategiesCheck = () => {
  return (
    <Box mb={2} display={"flex"} flexDirection={"column"}>
      <CustomFormLabel htmlFor='demo-simple-select'>Выберите стратегию</CustomFormLabel>
      <CustomSelect
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={{
          
        }}
        onChange={(e: any) => console.log(e.target.value)}
        fullWidth
      >
        <MenuItem value={"close_to_minimal"}>
          <Box display={"flex"} alignItems={"center"}>
            close_to_minimal
          </Box>
        </MenuItem>
        <MenuItem value={"quantity_dependent"}>
          <Box display={"flex"} alignItems={"center"}>
            quantity_dependent
          </Box>
        </MenuItem>
        <MenuItem value={"equal_price"}>
          <Box display={"flex"} alignItems={"center"}>
            equal_price
          </Box>
        </MenuItem>
      </CustomSelect>
    </Box>
  );
};

export default StrategiesCheck;
