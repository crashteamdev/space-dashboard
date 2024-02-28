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
  company?: string;
}

const PaymentList = ({ setContext, context = "enot", error, pay }: paymentListProps) => {
  const theme = useSelector((state: AppState) => state.customizer) as any;
  return (
    <Grid item xs={12} sm={12} lg={12}>
      <CustomFormLabel htmlFor='demo-simple-select'>Платежное средство</CustomFormLabel>
      <CustomSelect
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={context}
        defaultValue={"enot"}
        onChange={(e: any) => setContext(e.target.value)}
        fullWidth
      >
        <MenuItem value={"enot"} className="flex">
          <AppIcon className="h-[30px]" type="enot" color={theme.activeMode === "light" ? "#0D1019" : "white"} />
        </MenuItem>
        <MenuItem value={"Freekassa"}>
          <AppIcon className="h-[20px]" type="freekassa" color={theme.activeMode === "light" ? "black" : "white"} />
        </MenuItem>
        {pay && <MenuItem value={"Оплата с баланса"}>Оплата с баланса</MenuItem>}
      </CustomSelect>
      {error ? "Выберите провайдера" : ""}
      {context === "enot" && "Enot поддерживает карты Узбекистана и России"}
    </Grid>
  );
};

export default PaymentList;
