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
  pricing?: number;
}

const PaymentList = ({ setContext, context, error }: paymentListProps) => {

  const theme = useSelector((state: AppState) => state.customizer) as any;
  // const balanceReducer = useSelector((state: AppState) => state.balanceReducer) as any;

  return (
    <Grid item xs={12} sm={12} lg={12}>
      <CustomFormLabel htmlFor='demo-simple-select'>Платежное средство</CustomFormLabel>
      <CustomSelect
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={context}
        defaultValue={""}
        onChange={(e: any) => setContext(e.target.value)}
        fullWidth
      >
        <MenuItem key="" value={"Оплата с баланса"}>Оплата с баланса</MenuItem>,
        <MenuItem key="freekassa" value={"Freekassa"}>
          <AppIcon className="h-[20px]" type="freekassa" color={theme.activeMode === "light" ? "black" : "white"} />
        </MenuItem>,
      </CustomSelect>
      {error ? "Выберите провайдера" : ""}
      {/* {context === "enot" && "Enot поддерживает карты Узбекистана и России"} */}
    </Grid>
  );
};

export default PaymentList;
