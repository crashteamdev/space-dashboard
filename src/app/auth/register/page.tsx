"use client";
import React from "react";
import { Grid, Box, Card, Typography, Stack, Button } from "@mui/material";
import Link from "next/link";
import Logo from "@/components/ui/logo/Logo";
import PageContainer from "@/components/ui/container/PageContainer";
import AuthRegister from "../../../processes/auth/AuthRegister";
import { useState } from "react";
import { addItem } from "@/shared/store/slices/alerts/AlertsSlice";
import { useDispatch } from "@/shared/store/hooks";
import { v4 as uuidv4 } from "uuid";

export default function Register2() {
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const dispatch = useDispatch();

  const setState: () => void = () => {
    setIsCreated(!isCreated);
    dispatch(
      addItem({
        title: "Аккаунт создан",
        description: "Теперь вы можете зайти в личный кабинет",
        status: "success",
        timelife: 3000,
        id: uuidv4()
      })
    );
  };

  return (
    <PageContainer title='Register Page' description='this is Sample page'>
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: "''",
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3"
          }
        }}
      >
        <Grid container spacing={0} justifyContent='center' sx={{ height: "100vh" }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "450px" }}>
              <Box display='flex' alignItems='center' justifyContent='center'>
                <Logo />
              </Box>
              {isCreated ? (
                <>
                  <Typography variant='h6' fontWeight='500' mb={2}>
                    Вы успешно зарегистрировались!
                  </Typography>
                  <Button
                    component={Link}
                    color='primary'
                    fullWidth
                    variant='contained'
                    href={"/auth/login"}
                    type='submit'
                  >
                    Перейти к авторизации
                  </Button>
                </>
              ) : (
                <AuthRegister
                  setIsCreated={setState}
                  subtext={
                    <Typography variant='subtitle1' textAlign='center' color='textSecondary' mb={1}>
                      Аналитика маркетплейсов
                    </Typography>
                  }
                  subtitle={
                    <Stack direction='row' spacing={1} mt={3}>
                      <Typography color='textSecondary' variant='h6' fontWeight='400'>
                        У вас уже есть учетная запись?
                      </Typography>
                      <Typography
                        component={Link}
                        href='/auth/login'
                        fontWeight='500'
                        sx={{
                          textDecoration: "none",
                          color: "primary.main"
                        }}
                      >
                        Войти
                      </Typography>
                    </Stack>
                  }
                />
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

Register2.layout = "Blank";
