"use client";

import HistoryTable from "@/components/historyTable/historyTable";
import PageContainer from "@/components/ui/container/PageContainer";
import { useRouter } from "next/navigation";
import React from "react";
import EastIcon from "@mui/icons-material/East";

const HistoryPage = () => {
  const router = useRouter();
  return (
    <PageContainer title='История изменения товара | MarketDB' description='История изменения цен на товары'>
      <button onClick={router.back} className="flex gap-1 items-center mb-2">
        <EastIcon className="rotate-180 !w-[15px] !h-[15px]" />
        <span className="text-[12px] font-medium">Назад</span>
      </button>
      <h1 className="text-[22px] mb-5 font-bold">История изменения цены</h1>
      <HistoryTable />
    </PageContainer>
  );
};

export default HistoryPage;
