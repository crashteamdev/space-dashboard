"use client";
import React from "react";
import { Grid, Box, Card, Typography, Button } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";
import AuthForgotPassword from "@/processes/auth/AuthForgotPassword";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ForgotPassword2() {
  const [isSend, setIsSend] = useState(false);

  const router = useRouter();

  const back = () => {
    router.back();
  };

  return (
    <PageContainer title='Восстановление пароля' description='Восстановление пароля на MarketDB'>
      <Grid container spacing={0} justifyContent='center' sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}>
            <Box display='flex' alignItems='center' justifyContent='center'>
              <Image
                src='/images/logos/logo-horizontal.svg'
                alt='logo'
                height={70}
                width={174}
                priority
              />
            </Box>
            <Typography
              color='textSecondary'
              textAlign='center'
              variant='subtitle2'
              fontWeight='400'
            >
              {isSend
                ? "На ваш адрес электронной почты, отправлена ссылка для восстановления пароля!"
                : "Пожалуйста, введите адрес электронной почты, связанный с вашей учетной записью, и мы вышлем вам ссылку для сброса пароля."}
            </Typography>
            {isSend ? (
              <Box mt={2}>
                <Button color='primary' size='large' fullWidth onClick={() => back()}>
                  Вернуться на страницу авторизации
                </Button>
              </Box>
            ) : (
              <AuthForgotPassword back={back} setIsSend={setIsSend} />
            )}
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

ForgotPassword2.layout = "Blank";
