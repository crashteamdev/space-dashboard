"use client";

import React from "react";
import {
  Box
} from "@mui/material";
import { AppState } from "@/shared/store/store";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { setOpen } from "@/shared/store/slices/walletPopup/WalletPopupSlice";
import { useTranslation } from "react-i18next";
import { AppButton } from "@/shared/components/AppButton";
import { DialogPay } from "./components/DialogPay";

const Wallet = ({ hideMenu }: any) => {
  const { t } = useTranslation();
  const balanceReducer = useSelector((state: AppState) => state.balanceReducer) as any;
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(setOpen(true));
  };

  return (
    <>
      {!hideMenu ? (
        <Box className="bg-white" mt={4} p={2}>
          <div className="text-black-800 font-semibold text-lg">
            {t("balance.title")}:
          </div>
          <div className="text-black-800 font-semibold text-lg">$ {balanceReducer.amount }</div>
          <Box mt={2}>
            <AppButton 
              tag="button" 
              onClick={handleClickOpen}
              className="w-full bg-[#5D87FF] text-white rounded-lg py-3 flex justify-center font-semibold"
            >
              Пополнить баланс
            </AppButton>
          </Box>
        </Box>
      ) : null}
      <DialogPay />
    </>
  );
};
export default Wallet;
