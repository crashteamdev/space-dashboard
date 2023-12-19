import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import CustomTextField from "../theme-elements/CustomTextField";
import { checkPromoCode } from "@/shared/store/slices/balance/BalanceSlice";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";

const checkStep = (value: string) => {
  switch (value) {
    case "validPromoCode":
      return "Промокод применен";
    case "invalidPromoCodeDate":
      return "У промокода истек срок использования";
    case "invalidPromoCodeUseLimit":
      return "Превышен лимит использования промокода";
    case "notFoundPromoCode":
      return "Промокод не найден";
    default:
      return "Промокод не найден";
  }
};

const CheckPromoCode = () => {
  const [promocode, setPromocode] = React.useState("");
  const [error, setError] = React.useState("");
  const auth = getAuth(firebase_app) as any;
  const balanceReducer = useSelector((state: AppState) => state.balanceReducer) as any;
  const dispatch = useDispatch();

  const checkPromo = () => {
    if (promocode) {
      dispatch(checkPromoCode(auth.currentUser.accessToken, promocode));
      dispatch(checkPromoCode(auth.currentUser.accessToken, promocode));
    } else {
      setError("Поле с промокодом пустое, заполните его");
      setTimeout(() => setError(""), 2500);
    }
  };

  return (
    <Box mb={2} display={"flex"} flexDirection={"column"}>
      <CustomFormLabel>Промокод (необязательно)</CustomFormLabel>
      <Box className="flex gap-3 relative items-center">
        <CustomTextField
          fullWidth
          margin={"none"}
          onChange={(e: any) => setPromocode(e.target.value)}
          placeholder={"Введите промокод"}
          id='new-password'
          name='new-password'
        />
        <button className="absolute right-2 bg-blue-800 rounded-[7px] py-[4px] px-2.5 font-medium text-white" onClick={() => checkPromo()} >
          Использовать
        </button>
      </Box>
      {error ? (
        <Typography variant='body1' sx={{ mt: 1 }}>
          {error}
        </Typography>
      ) : (
        ""
      )}
      {balanceReducer.resultPromo ? (
        <Typography variant='body1' sx={{ mt: 1 }}>
          {checkStep(balanceReducer.resultPromo)}
        </Typography>
      ) : (
        ""
      )}
    </Box>
  );
};

export default CheckPromoCode;
