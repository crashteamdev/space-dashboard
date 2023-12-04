import { Box, Grid, MenuItem } from "@mui/material";
import React from "react";
import CustomFormLabel from "../ui/theme-elements/CustomFormLabel";
import CustomSelect from "../ui/theme-elements/CustomSelect";
import Image from "next/image";
import fk from "../../../public/images/payment/fk.png";
import click from "../../../public/images/payment/click.png";
import lava from "../../../public/images/payment/lava.png";

interface paymentListProps {
  setContext: (value: string) => void;
  context: string;
  error: string;
  pay: boolean;
}

const PaymentList = ({ setContext, context, error, pay }: paymentListProps) => {
  return (
    <Grid item xs={12} sm={12} lg={12}>
      <CustomFormLabel htmlFor='demo-simple-select'>Платежное средство</CustomFormLabel>
      <CustomSelect
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={context}
        onChange={(e: any) => setContext(e.target.value)}
        fullWidth
      >
        <MenuItem value={"Freekassa"}>
          <Box display={"flex"} alignItems={"center"}>
            <Image src={fk} alt={""} />
            Freekassa
          </Box>
        </MenuItem>
        <MenuItem value={"uz-click"}>
          <Box display={"flex"} alignItems={"center"}>
            <Image src={click} alt={""} />
            Click
          </Box>
        </MenuItem>
        <MenuItem value={"lava"}>
          <Box display={"flex"} alignItems={"center"}>
            <Image src={lava} alt={""} />
            Lava
          </Box>
        </MenuItem>
        {pay && <MenuItem value={"Оплата с баланса"}>Оплата с баланса</MenuItem>}
      </CustomSelect>
      {error ? "Выберите провайдера" : ""}
    </Grid>
  );
};

export default PaymentList;
