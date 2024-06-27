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
        <Link className="flex items-center gap-1 mt-2" target="_blank" href="https://doc.marketdb.pro/documentation/repricer.html">
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
