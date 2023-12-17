"use client";

import HeaderAccount from "@/components/headerAccount/headerAccount";
import ShopList from "@/components/shopList/shopList";
import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import { Box } from "@mui/material";
import { t } from "i18next";
import React from "react";

const BCrumb = [
  {
    to: "/",
    title: t("main")
  },
  {
    to: "/reprice",
    title: "Управление ценами"
  },
  {
    title: "Выбор магазина"
  }
] as any;

const AccountPage = () => {
  return (
    <PageContainer title='Master settings' description='Master settings'>
      <Box mt={4}></Box>
      <Breadcrumb title={"Выбор магазина"} items={BCrumb} />
      <Box mb={2}>
        <HeaderAccount />
      </Box>
      <ShopList />
    </PageContainer>
  );
};

export default AccountPage;