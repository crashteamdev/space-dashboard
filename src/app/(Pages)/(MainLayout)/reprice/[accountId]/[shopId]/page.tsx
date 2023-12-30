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
        <Link target="_blank" className="flex items-center gap-1 mt-2" href="https://wiki.marketdb.ru/ru/additionally/repricer#h-3-%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D1%8F-%D0%BE-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%D0%B5">
          <span className="text-grayModern-500 text-[14px]">Инструкция</span>
          <BookmarkIcon className="!w-[17px] !h-[17px] !fill-blueGray-600" />
        </Link>
      </div>
      <ProductTableList />
    </PageContainer>
  );
};

export default Accounts;
