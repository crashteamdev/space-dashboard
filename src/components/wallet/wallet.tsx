"use client";

import React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  DialogContentText
} from "@mui/material";
import CustomTextField from "../ui/theme-elements/CustomTextField";
import { AppState } from "@/shared/store/store";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { setOpen, setValue } from "@/shared/store/slices/walletPopup/WalletPopupSlice";
import CustomFormLabel from "../ui/theme-elements/CustomFormLabel";
import ChildCard from "../ui/shared/ChildCard";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const Wallet = ({ hideMenu }: any) => {
  const [valueText, setValueText] = React.useState("");

  const { t } = useTranslation();

  const walletPopup = useSelector((state: AppState) => state.walletPopup);
  const balanceReducer = useSelector((state: AppState) => state.balanceReducer) as any;
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(setOpen(true));
  };

  const handleLink = () => {
    dispatch(setValue(valueText));
    dispatch(setOpen(false));
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const handleChange = (value: string) => {
    setValueText(
      value
        .replace(/\d $/, "")
        .replace(/\D/g, "")
        // eslint-disable-next-line security/detect-unsafe-regex
        .replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ")
    );
  };

  return (
    <>
      {!hideMenu ? (
        <Box bgcolor={"info.light"} mt={4} p={2}>
          <Typography variant='h6' fontWeight={400} mb={1}>
            {t("balance.title")}:
          </Typography>
          <Stack direction='row' spacing={2} justifyContent='space-between'>
            <Typography variant='h4'>$ {balanceReducer.amount}</Typography>
          </Stack>
          <Box mt={2}>
            <Button
              onClick={handleClickOpen}
              color='primary'
              variant='contained'
              fullWidth
              type='submit'
            >
              Пополнить баланс
            </Button>
          </Box>
        </Box>
      ) : null}

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
              value={"$ " + valueText}
              onChange={(input: any) => handleChange(input.currentTarget.value)}
              margin='dense'
              id='email'
              name='email'
            />
          </Box>
        </DialogContent>
        <Grid item xs={12} lg={4} sm={6} display='flex' alignItems='stretch'>
          <ChildCard>
            <Stack direction='row' gap={3} justifyContent={"space-between"}>
              <Button onClick={() => handleChange("10")} fullWidth>
                $ 10
              </Button>
              <Button onClick={() => handleChange("15")} fullWidth>
                $ 15
              </Button>
              <Button onClick={() => handleChange("20")} fullWidth>
                $ 20
              </Button>
              <Button onClick={() => handleChange("30")} fullWidth>
                $ 30
              </Button>
            </Stack>
          </ChildCard>
        </Grid>
        <Stack direction='row' px={3} pb={2} mb={2} mt={2} justifyContent={"space-between"}>
          <Button variant='contained' color='error' onClick={handleClose}>
            Отменить
          </Button>
          <Button
            variant='contained'
            component={Link}
            color='primary'
            href='/payment'
            onClick={handleLink}
          >
            Оплатить
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};
export default Wallet;
