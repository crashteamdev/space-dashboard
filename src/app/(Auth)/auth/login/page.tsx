"use client";
import React from "react";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";
import AuthLogin from "@/processes/auth/AuthLogin";
import Image from "next/image";

export default function Login2() {
  return (
    <PageContainer title='Login Page' description='this is Sample page'>
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
              <Image
                src='/images/logos/logo-horizontal.svg'
                alt='logo'
                height={70}
                width={174}
                priority
              />
              </Box>
              <AuthLogin
                subtitle={
                  <Stack direction='row' spacing={1} justifyContent='center' mt={3}>
                    <Typography color='textSecondary' variant='h6' fontWeight='500'>
                      Впервые в MarketDB?
                    </Typography>
                    <Typography
                      component={Link}
                      href='/auth/register'
                      fontWeight='500'
                      sx={{
                        textDecoration: "none",
                        color: "primary.main"
                      }}
                    >
                      Создать аккаунт
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

Login2.layout = "Blank";
