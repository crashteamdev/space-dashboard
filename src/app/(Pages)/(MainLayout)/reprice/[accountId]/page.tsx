"use client";

import HeaderAccount from "@/components/headerAccount/headerAccount";
import ShopList from "@/components/shopList/shopList";
import PageContainer from "@/components/ui/container/PageContainer";
import Link from "next/link";
import React from "react";
import EastIcon from "@mui/icons-material/East";

const AccountPage = () => {
  return (
    <PageContainer title='Автоизменение цен | MarketDB' description='Настройки аккаунта, список магазинов'>
      <Link href={"/reprice"} className="flex gap-1 items-center mb-2">
        <EastIcon className="rotate-180 !w-[15px] !h-[15px]" />
        <span className="text-[12px] font-medium">Назад</span>
      </Link>
      <h1 className="text-[22px] mb-10 font-bold">Настройки аккаунта</h1>
      <HeaderAccount />
      <ShopList />
    </PageContainer>
  );
};

export default AccountPage;
