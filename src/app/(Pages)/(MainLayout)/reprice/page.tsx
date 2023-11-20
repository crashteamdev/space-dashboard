"use client";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";
import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";
import { t } from "i18next";
import AccountsReprice from "../../../../components/tables/accountsReprice";
import CreateNewAccount from "../../../../components/createNewAccount/createNewAccount";

const BCrumb = [
  {
    to: "/",
    title: t("main"),
  },
  {
    title: "Управление ценами",
  },
] as any;

const Reprice = () => {
  const [open, setOpen] = useState(false) as any;

  return (
    <PageContainer title="Master settings" description="Master settings">
      <Box mt={4}></Box>
      <Breadcrumb title={`Мастер настройки`} items={BCrumb} />
      <Box mb={2}>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          color="primary"
        >
          Добавить аккаунт
        </Button>
        <CreateNewAccount open={open} setOpen={setOpen} />
      </Box>
      <AccountsReprice />
    </PageContainer>
  );
};

export default Reprice;
