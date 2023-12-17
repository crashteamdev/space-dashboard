import { Grid, MenuItem } from "@mui/material";
import React from "react";
import CustomFormLabel from "../ui/theme-elements/CustomFormLabel";
import CustomSelect from "../ui/theme-elements/CustomSelect";
import { AppIcon } from "@/shared/components/AppIcon";
import { useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";

interface paymentListProps {
  setContext: (value: string) => void;
  context: string;
  error: string;
  pay: boolean;
}

const PaymentList = ({ setContext, context = "Freekassa", error, pay }: paymentListProps) => {
  const theme = useSelector((state: AppState) => state.customizer) as any;
  return (
    <Grid item xs={12} sm={12} lg={12}>
      <CustomFormLabel htmlFor='demo-simple-select'>Платежное средство</CustomFormLabel>
      <CustomSelect
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={context}
        defaultValue={"Freekassa"}
        onChange={(e: any) => setContext(e.target.value)}
        fullWidth
      >
        <MenuItem value={"Freekassa"}>
          <AppIcon className="h-[20px]" type="freekassa" color={theme.activeMode === "light" ? "black" : "white"} />
        </MenuItem>
        {/* <MenuItem value={"uz-click"}>
          <Box display={"flex"} alignItems={"center"}>
            <Image src={click} alt={""} />
            Click
          </Box>
        </MenuItem> */}
        <MenuItem value={"lava"}>
          <AppIcon className="h-[30px]" type="lava-pay" color={theme.activeMode === "light" ? "black" : "white"} />
        </MenuItem>
        {pay && <MenuItem value={"Оплата с баланса"}>Оплата с баланса</MenuItem>}
      </CustomSelect>
      {error ? "Выберите провайдера" : ""}
    </Grid>
  );
};

export default PaymentList;
