"use client";

import React, { useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Alert,
  Grid,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";
import Image from "next/image";

import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import ParentCard from "@/components/ui/shared/ParentCard";
import { Stack } from "@mui/system";
import data from "../../../../components/ui/theme-elements/data";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import {
  setProvider,
  setValue,
} from "@/shared/store/slices/walletPopup/WalletPopupSlice";
import CustomTextField from "../../../../components/ui/theme-elements/CustomTextField";
import { checkPromoCode, topUpBalance } from "@/shared/store/slices/balance/BalanceSlice";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useRouter } from "next/navigation";
import CustomSelect from "@/components/ui/theme-elements/CustomSelect";

const checkStep = (value: string) => {
  switch (value) {
    case "validPromoCode":
      return "Промокод применен"
    case "invalidPromoCodeDate":
      return "У промокода истек срок использования"
    case "invalidPromoCodeUseLimit":
      return "Превышен лимит использования промокода"
    case "notFoundPromoCode":
      return "Промокод не найден"
    default: 
      return "Промокод не найден"

  }
}
const steps = ["Сумма пополнения", "Выбор платежного средства", "Оплата"];

const Payment = () => {
  const walletPopup = useSelector((state: AppState) => state.walletPopup);
  const auth = getAuth(firebase_app) as any;
  const balanceReducer = useSelector(
    (state: AppState) => state.balanceReducer
  ) as any; 
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = React.useState(walletPopup.value ? 1 : 0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [promocode, setPromocode] = React.useState("");
  const [context, setContext] = React.useState("");
  const router = useRouter();
  const isStepSkipped = (step: any) => skipped.has(step);

  const [valueText, setValueText] = React.useState(walletPopup.value || 0) as any;

  const handleChange = (value: string) => {
    setValueText(
      value
        .replace(/\d $/, "")
        .replace(/\D/g, "")
        .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
    );
  };

  const handleNext = async () => {
    if (activeStep === 0 && parseFloat(valueText) === 0 || !valueText) {
      return null
    }
    if (activeStep === 1 && !context) {
      return null
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    dispatch(setValue(valueText));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if (activeStep === 2) {
      dispatch(
        topUpBalance(
          auth.currentUser.accessToken,
          "",
          walletPopup.value,
          context
        )
      );
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const checkPromo = () => {
    dispatch(checkPromoCode(auth.currentUser.accessToken, promocode, ""));
  };

  useEffect(() => {
    router.push(balanceReducer.linkPayment)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceReducer.linkPayment])

  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography mt={4}>
              С баланса списывается ТОЛЬКО стоимость услуг за сервис
            </Typography>
            <Box mt={2}>
              <CustomFormLabel>Сумма к пополнению</CustomFormLabel>
              <CustomTextField
                fullWidth
                autoFocus
                value={"$" + valueText}
                onChange={(input: any) =>
                  handleChange(input.currentTarget.value)
                }
                margin="dense"
                id="email"
                name="email"
              />
            </Box>
            <Grid
              item
              xs={12}
              lg={4}
              sm={6}
              display="flex"
              alignItems="stretch"
            >
              <Stack
                direction="row"
                mt={2}
                gap={3}
                justifyContent={"space-between"}
              >
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
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box mt={4}>
            <Grid item xs={12} sm={12} lg={4}>
              <CustomFormLabel htmlFor="demo-simple-select">Платежное средство</CustomFormLabel>
              <CustomSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={context}
                onChange={(e: any) => setContext(e.target.value)}
                fullWidth
              >
                <MenuItem value={'Freekassa'}>Freekassa</MenuItem>
                <MenuItem value={'uz-click'}>uz-click</MenuItem>
              </CustomSelect>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box pt={3}>
            <Typography variant="h5">MarketDB KazanExpress</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Провайдер: {context}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Сумма: ${walletPopup.value} - {+walletPopup.value * 98}рублей
            </Typography>
          </Box>
        );
      default:
        break;
    }
  };

  return (
    <PageContainer title="Form Wizard" description="this is Form Wizard">
      <Box mt={5}>
        <ParentCard title="Пополнение баланса">
          <Box width="100%">
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                <Stack spacing={2} mt={3}>
                  <Alert severity="success">
                    Все этапы завершены, сейчас вас перенаправит на провайдера
                  </Alert>
                </Stack>
              </>
            ) : (
              <>
                <Box>{handleSteps(activeStep)}</Box>

                <Box display="flex" flexDirection="row" mt={3}>
                  <Button
                    color="inherit"
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Назад
                  </Button>
                  <Box flex="1 1 auto" />
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    color={
                      activeStep === steps.length - 1 ? "success" : "secondary"
                    }
                  >
                    {activeStep === steps.length - 1 ? "Оплатить" : "Дальше"}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </ParentCard>
      </Box>
    </PageContainer>
  );
};

export default Payment;
