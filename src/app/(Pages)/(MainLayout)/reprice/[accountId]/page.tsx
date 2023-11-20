"use client"

import ShopList from "@/components/shopList/shopList";
import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import { Box, Button } from "@mui/material";
import { t } from "i18next";
import React from "react";

const BCrumb = [
  {
    to: "/",
    title: t("main"),
  },
  {
    to: "/reprice",
    title: "Управление ценами",
  },
  {
    title: "Выбор магазина",
  },
] as any;

const AccountPage = ({ accountId }: any) => {
  return (
    <PageContainer title="Master settings" description="Master settings">
      <Box mt={4}></Box>
      <Breadcrumb title={`Выбор магазина`} items={BCrumb} />
      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
        >
          Добавить аккаунт
        </Button>
      </Box>
      <ShopList />
    </PageContainer>
  );
};

export default AccountPage;
