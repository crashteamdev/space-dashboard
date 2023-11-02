"use client";
import { Grid, Box, Card, Typography } from "@mui/material";
import Logo from "@/components/ui/logo/Logo";
import PageContainer from "@/components/ui/container/PageContainer";
import AuthForgotPassword from "../../../processes/auth/AuthForgotPassword";

export default function ForgotPassword2() {
  return (
    <PageContainer
      title="Forgot Password Page"
      description="this is Sample page"
    >
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Typography
                color="textSecondary"
                textAlign="center"
                variant="subtitle2"
                fontWeight="400"
              >
                Пожалуйста, введите адрес электронной почты, связанный с вашей
                учетной записью, и мы вышлем вам ссылку для сброса пароля.
              </Typography>
              <AuthForgotPassword />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

ForgotPassword2.layout = "Blank";
