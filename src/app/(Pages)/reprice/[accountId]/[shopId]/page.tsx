"use client";
import React from "react";
import PageContainer from "@/components/ui/container/PageContainer";
import ProductTableList from "@/components/ProductTableList/ProductTableList";
import EastIcon from "@mui/icons-material/East";
import { useRouter } from "next/navigation";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Link from "next/link";

const Accounts = () => {
  const router = useRouter();
  return (
    <PageContainer title='Список товаров магазина | MarketDB' description='Список товаров, выгрузка из магазинов маркетплейса, настройка товара'>
      <button onClick={router.back} className="flex gap-1 items-center mb-2">
        <EastIcon className="rotate-180 !w-[15px] !h-[15px]" />
        <span className="text-[12px] font-medium">Назад</span>
      </button>
      <div className="mb-10">
        <h1 className="text-[22px] mb-2 font-bold">Список товаров магазина</h1>
        <Link target="_blank" className="flex items-center gap-1 mt-2" href="https://doc.marketdb.pro/documentation/repricer.html">
          <span className="text-grayModern-500 text-[14px]">Инструкция</span>
          <BookmarkIcon className="!w-[17px] !h-[17px] !fill-blueGray-600" />
        </Link>
      </div>
      <ProductTableList />
    </PageContainer>
  );
};

export default Accounts;
