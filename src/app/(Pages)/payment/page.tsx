"use client";

import React, { useEffect } from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography, Alert } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";

import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import ParentCard from "@/components/ui/shared/ParentCard";
import { Stack } from "@mui/system";
import { useSelector } from "@/shared/store/hooks";
import { useDispatch as useReduxDispatch } from "react-redux";
import { AppState } from "@/shared/store/store";
import { setValue } from "@/shared/store/slices/walletPopup/WalletPopupSlice";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import { getExchange, topUpBalance } from "@/shared/store/slices/balance/BalanceSlice";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useRouter } from "next/navigation";
import PaymentList from "@/components/paymentList/paymentList";

const steps = ["Сумма пополнения", "Выбор платежного средства", "Оплата"];

const Payment = () => {
  const walletPopup = useSelector((state: AppState) => state.walletPopup);
  const auth = getAuth(firebase_app) as any;
  const balanceReducer = useSelector((state: AppState) => state.balanceReducer) as any;
  const dispatch = useReduxDispatch();

  const [activeStep, setActiveStep] = React.useState(walletPopup.value ? 1 : 0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [empty, setEmpty] = React.useState("");
  const [context, setContext] = React.useState("yookassa");
  const router = useRouter();
  const isStepSkipped = (step: any) => skipped.has(step);

  const [valueText, setValueText] = React.useState(walletPopup.value || 0) as any;

  const handleChange = (value: string) => {
    setValueText(
      value
        .replace(/\d ₽/, "")
        .replace(/\D/g, "")
        // eslint-disable-next-line security/detect-unsafe-regex
        .replace(/(\d)(?=(\d{3})+(\D|₽))/g, "$1 ")
    );
  };

  const handleNext = async () => {
    if ((activeStep === 0 && parseFloat(valueText) === 0) || !valueText) {
      return null;
    }
    if (activeStep === 1 && !context) {
      setEmpty("Выберите провайдера выше");
      setTimeout(() => {
        setEmpty("");
      }, 2000);
      return null;
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
      // dispatch(addItem({title: 'Ожидайте', description: "Происходит редирект на страницу оплаты", status: 'info', timelife: 4000, id: uuidv4()}));
      dispatch(
        topUpBalance(+walletPopup.value, context)
      );
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    
    router.push(balanceReducer.linkPayment);
    dispatch(getExchange(auth.currentUser.accessToken, "RUB"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceReducer.linkPayment]);

  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography mt={4}>С баланса списывается ТОЛЬКО стоимость услуг за сервис</Typography>
            <Box mt={2}>
              <CustomFormLabel>Сумма к пополнению</CustomFormLabel>
              <CustomTextField
                fullWidth
                value={"₽ " + valueText}
                onChange={(input: any) => handleChange(input.currentTarget.value)}
                margin='dense'
                id='email'
                name='email'
              />
            </Box>
            <div className="flex gap-3 w-full max-w-xl">
              <Button onClick={() => handleChange("2000")} fullWidth>
                2000 ₽
              </Button>
              <Button onClick={() => handleChange("2600")} fullWidth>
                2600 ₽
              </Button>
              <Button onClick={() => handleChange("3300")} fullWidth>
                3300 ₽
              </Button>
              <Button onClick={() => handleChange("4500")} fullWidth>
                4500 ₽
              </Button>
            </div>
          </Box>
        );
      case 1:
        return (
          <Box mt={4}>
            <PaymentList pay={false} error={empty} context={context} setContext={setContext} />
          </Box>
        );
      case 2:
        return (
          <Box pt={3}>
            <Typography variant='h6' sx={{ mt: 1 }}>
              Платежное средство: {context}
            </Typography>
            <Typography variant='h6' sx={{ mt: 1 }}>
              Сумма: {walletPopup.value} ₽
              {/* {Math.floor( +walletPopup.value * balanceReducer.exchange )} рублей */}
            </Typography>
          </Box>
        );
      default:
        break;
    }
  };

  return (
    <PageContainer title='Form Wizard' description='this is Form Wizard'>
      <Box mt={5}>
        <ParentCard title='Пополнение баланса'>
          <Box width='100%'>
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
                  <Alert severity='success'>
                    Все этапы завершены, сейчас вас перенаправит на провайдера
                  </Alert>
                </Stack>
              </>
            ) : (
              <>
                <Box>{handleSteps(activeStep)}</Box>

                <Box display='flex' flexDirection='row' mt={3}>
                  <Button
                    color='inherit'
                    variant='contained'
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Назад
                  </Button>
                  <Box flex='1 1 auto' />
                  <Button
                    onClick={handleNext}
                    variant='contained'
                    color={activeStep === steps.length - 1 ? "success" : "secondary"}
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
