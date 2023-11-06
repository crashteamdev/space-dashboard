"use client";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";
import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";
import { t } from "i18next";
import Table5 from "../../../../components/tables/Table5";
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
    <PageContainer title="Profile" description="this is profile">
      <Box mt={4}></Box>
      <Breadcrumb title={`Управление ценами`} items={BCrumb} />
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
      <Table5 />
    </PageContainer>
  );
};

export default Reprice;
