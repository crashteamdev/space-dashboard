"use client";
import React from "react";
import PageContainer from "@/components/ui/container/PageContainer";
import ProfileInfo from "@/components/profileInfo/profileInfo";

const UserProfile = () => {
  return (
    <PageContainer title='Личный кабинет' description='Личный кабинет с подпиской на сервисы MarketDB'>
      <ProfileInfo />
    </PageContainer>
  );
};

export default UserProfile;
