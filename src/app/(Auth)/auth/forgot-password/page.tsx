"use client";
import React from "react";
import PageContainer from "@/components/ui/container/PageContainer";
import Image from "next/image";
import { ForgotPasswordForm } from "@/widgets/auth";

export default function ForgotPassword2() {
  return (
    <PageContainer title='Восстановление пароля' description='Восстановление пароля на MarketDB'>
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
          <ForgotPasswordForm />
        </div>
      </div>
    </PageContainer>
  );
}

ForgotPassword2.layout = "Blank";
