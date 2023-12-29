"use client";
import React from "react";
import PageContainer from "@/components/ui/container/PageContainer";
import ProductTableList from "@/components/ProductTableList/ProductTableList";
import EastIcon from "@mui/icons-material/East";
import { useRouter } from "next/navigation";

const Accounts = () => {
  const router = useRouter();
  return (
    <PageContainer title='Список товаров магазина | MarketDB' description='Список товаров, выгрузка из магазинов маркетплейса, настройка товара'>
      <button onClick={router.back} className="flex gap-1 items-center mb-2">
        <EastIcon className="rotate-180 !w-[15px] !h-[15px]" />
        <span className="text-[12px] font-medium">Назад</span>
      </button>
      <h1 className="text-[22px] mb-5 font-bold">Список товаров магазина</h1>
      <ProductTableList />
    </PageContainer>
  );
};

export default Accounts;
