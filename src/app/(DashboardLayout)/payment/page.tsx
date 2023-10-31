"use client";

import React from "react";
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
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Image from "next/image";

import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel";
import ParentCard from "@/app/(DashboardLayout)/components/shared/ParentCard";
import { Stack } from "@mui/system";
import data from "../components/forms/theme-elements/data";
import { useDispatch, useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import {
  setProvider,
  setValue,
} from "@/store/apps/walletPopup/WalletPopupSlice";
import CustomTextField from "../components/forms/theme-elements/CustomTextField";

const steps = ["Сумма пополнения", "Выбор платежного средства", "Оплата"];

const Payment = () => {
  const walletPopup = useSelector((state: AppState) => state.walletPopup);
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = React.useState(walletPopup.value ? 1 : 0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step: any) => skipped.has(step);

  const [valueText, setValueText] = React.useState(walletPopup.value) as any;

  const handleChange = (value: string) => {
    setValueText(
      value
        .replace(/\d $/, "")
        .replace(/\D/g, "")
        .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
    );
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    dispatch(setValue(valueText));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // eslint-disable-next-line consistent-return
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
                defaultValue={"$" + walletPopup.value}
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
            <CustomFormLabel>Платежное средство</CustomFormLabel>
            <Autocomplete
              id="country-select-demo"
              fullWidth
              options={data}
              autoHighlight
              onChange={(e: any) => dispatch(setProvider(e.target.innerText))}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option) => (
                <li
                  {...props}
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <div
                    style={{
                      width: "86px",
                      height: "48px",
                      position: "relative",
                    }}
                  >
                    <Image
                      style={{
                        objectFit: "contain",
                        width: "86px",
                        height: "48px",
                        position: "relative",
                      }}
                      width={86}
                      height={48}
                      src={option.photo}
                      alt={option.title}
                    />
                  </div>
                  <b>{option.title}</b>
                </li>
              )}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  placeholder="Выбери платежное средство"
                  aria-label="Выбери платежное средство"
                  autoComplete="off"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </Box>
        );
      case 2:
        return (
          <Box pt={3}>
            <Typography variant="h5">MarketDB KazanExpress</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Провайдер: {walletPopup.provider}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Сумма: ${walletPopup.value} - {+walletPopup.value * 98}рублей
            </Typography>
            <Box mt={4}>
              <CustomFormLabel>Промокод (необязательно)</CustomFormLabel>
              <CustomTextField
                fullWidth
                autoFocus
                placeholder={"Введите промокод"}
                margin="dense"
                id="email"
                name="email"
              />
            </Box>
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
