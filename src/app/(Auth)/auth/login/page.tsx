"use client";
import React from "react";
import PageContainer from "@/components/ui/container/PageContainer";
import Image from "next/image";
import { AuthForm } from "@/widgets/auth";

export default function Login2() {
  return (
    <PageContainer title='Авторизация' description='Страница авторизации на сервисе аналитики MarketDB'>
      <div className="w-full h-full flex justify-center items-center relative">
        <div className="w-full max-w-[350px] flex flex-col items-center text-white">
          <Image
            src='/images/logos/logo-horizontal-dark.svg'
            alt='logo'
            height={70}
            width={174}
            priority
            className="mb-6"
          />
          <AuthForm />
        </div>
      </div>
    </PageContainer>
  );
}

Login2.layout = "Blank";
