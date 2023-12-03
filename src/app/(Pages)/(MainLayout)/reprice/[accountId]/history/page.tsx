"use client";

import HistoryTable from "@/components/historyTable/historyTable";
import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import { Box } from "@mui/material";
import { t } from "i18next";
import { useParams } from "next/navigation";
import React from "react";

const HistoryPage = () => {

  const { accountId } = useParams();

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
      to: `/reprice/${accountId}`,
      title: "Выбор магазина"
    },
    {
      title: "История изменения цен"
    }
  ] as any;
  return (
    <PageContainer title='Master settings' description='Master settings'>
      <Box mt={4}></Box>
      <Breadcrumb title={"История изменения цен"} items={BCrumb} />
      <Box mb={2}>
        <HistoryTable />
      </Box>
    </PageContainer>
  );
};

export default HistoryPage;
