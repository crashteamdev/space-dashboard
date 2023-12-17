"use client";

import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Error = () => {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <Image
          src={"/images/backgrounds/errorimg.svg"}
          alt="404" width={500} height={500}
          style={{ width: "100%", maxWidth: "500px",  maxHeight: "500px" }}
        />
        <Typography align="center" variant="h1" mb={4}>
          {t("errorPage.title")}
        </Typography>
        <Typography align="center" variant="h4" mb={4}>
          {t("errorPage.desc")}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          href="/"
          disableElevation
        >
          {t("errorPage.btn")}
        </Button>
      </Container>
    </Box>
  );
};

Error.layout = "Blank";
export default Error;