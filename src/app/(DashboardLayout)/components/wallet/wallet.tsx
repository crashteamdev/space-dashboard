"use client";

import {
  Box,
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import * as React from "react";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { AppState } from "@/store/store";
import { useDispatch, useSelector } from "@/store/hooks";
import { setOpen } from "@/store/apps/walletPopup/WalletPopupSlice";
import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";
import ChildCard from "../shared/ChildCard";
import { useTranslation } from "react-i18next";

const Wallet = () => {
  const [value, setValue] = React.useState("");

  const { t } = useTranslation();
  
  const walletPopup = useSelector((state: AppState) => state.walletPopup);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(setOpen(true));
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const handleChange = (value: string) => {
    setValue(
      value
        .replace(/\d $/, "")
        .replace(/\D/g, "")
        .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + " ₽"
    );
  };

  return (
    <>
      <Box bgcolor={"info.light"} mt={4} p={2}>
        <Typography variant="h6" fontWeight={400} mb={1}>
          {t("balance.title")}:
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography variant="h4">₽ 1 500</Typography>
        </Stack>
        <Box mt={2}>
          <Button
            onClick={handleClickOpen}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Пополнить баланс
          </Button>
        </Box>
      </Box>
      <Dialog open={walletPopup.open} onClose={handleClose}>
        <DialogTitle mt={2}>Пополнить баланс</DialogTitle>
        <DialogContent>
          <DialogContentText>
            С баланса списывается ТОЛЬКО стоимость услуг за сервис
          </DialogContentText>
          <Box mt={2}>
            <CustomFormLabel>Сумма к пополнению</CustomFormLabel>
            <CustomTextField
              fullWidth
              autoFocus
              value={value}
              onChange={(input: any) => handleChange(input.currentTarget.value)}
              margin="dense"
              id="email"
              name="email"
            />
          </Box>
        </DialogContent>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard>
            <Stack
              direction="row"
              gap={3}
              justifyContent={"space-between"}
            >
              <Button onClick={() => handleChange("500")} fullWidth>
                500
              </Button>
              <Button onClick={() => handleChange("1000")} fullWidth>
                1000
              </Button>
              <Button onClick={() => handleChange("1500")} fullWidth>
                1500
              </Button>
              <Button onClick={() => handleChange("2500")} fullWidth>
                2500
              </Button>
            </Stack>
          </ChildCard>
        </Grid>
        <Stack
          direction="row"
          px={3}
          pb={2}
          mb={2}
          mt={2}
          justifyContent={"space-between"}
        >
          <Button variant="contained" color="error" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Оплатить
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};
export default Wallet;
