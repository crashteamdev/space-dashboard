"use client";
import React from "react";
import PageContainer from "@/components/ui/container/PageContainer";
import ProfileInfo from "@/components/profileInfo/profileInfo";

const UserProfile = () => {
  return (
    <PageContainer title='Личный кабинет' description='Личный кабинет с подпиской на сервисы MarketDB'>
      <div className="mt-[50px]">
        <ProfileInfo />
      </div>
    </PageContainer>
  );
};

export default UserProfile;
