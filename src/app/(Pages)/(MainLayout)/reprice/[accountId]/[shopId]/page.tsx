"use client"
import React from "react";
import { useParams } from 'next/navigation'
import { Box } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";
import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";
import { t } from "i18next";
import HeaderAccount from "@/components/headerAccount/headerAccount";
import ProductTableList from "@/components/ProductTableList/ProductTableList";

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
    to: "/reprice/accountId",
    title: "Выбор магазина",
  },
  {
    title: "Ваш аккаунт",
  },
] as any;

const Accounts = () => {
  const params = useParams()
  console.log(params)

  return (
    <PageContainer title="Profile" description="this is profile">
      <Box mt={4}></Box>
      <Breadcrumb title={`Ваш аккаунт`} items={BCrumb} />
      <Box mb={2}>
        <HeaderAccount />
        <ProductTableList />
      </Box>
    </PageContainer>
  )
}

export default Accounts