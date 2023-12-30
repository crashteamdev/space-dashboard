"use client";

import HeaderAccount from "@/components/headerAccount/headerAccount";
import ShopList from "@/components/shopList/shopList";
import PageContainer from "@/components/ui/container/PageContainer";
import Link from "next/link";
import React from "react";
import EastIcon from "@mui/icons-material/East";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const AccountPage = () => {
  return (
    <PageContainer title='Автоизменение цен | MarketDB' description='Настройки аккаунта, список магазинов'>
      <Link href={"/reprice"} className="flex gap-1 items-center mb-2">
        <EastIcon className="rotate-180 !w-[15px] !h-[15px]" />
        <span className="text-[12px] font-medium">Назад</span>
      </Link>
      <div className="mb-10">
        <h1 className="text-[22px] mb-2 font-bold">Настройки аккаунта</h1>
        <Link className="flex items-center gap-1 mt-2" target="_blank" href="https://wiki.marketdb.ru/ru/additionally/repricer#h-2-%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D1%8F-%D0%BE%D0%B1-%D0%B0%D0%BA%D0%BA%D0%B0%D1%83%D0%BD%D1%82%D0%B5">
          <span className="text-grayModern-500 text-[14px]">Инструкция</span>
          <BookmarkIcon className="!w-[17px] !h-[17px] !fill-blueGray-600" />
        </Link>
      </div>
      <HeaderAccount />
      <ShopList />
    </PageContainer>
  );
};

export default AccountPage;
