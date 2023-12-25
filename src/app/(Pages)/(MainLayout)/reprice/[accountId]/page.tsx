"use client";

import HeaderAccount from "@/components/headerAccount/headerAccount";
import ShopList from "@/components/shopList/shopList";
import PageContainer from "@/components/ui/container/PageContainer";
import { Box } from "@mui/material";
import React from "react";

const AccountPage = () => {
  return (
    <PageContainer title='Master settings' description='Master settings'>
      {/* <Breadcrumb title={"Выбор магазина"} items={BCrumb} /> */}
      <Box mb={2}>
        <HeaderAccount />
      </Box>
      <ShopList />
    </PageContainer>
  );
};

export default AccountPage;
