"use client";
import React from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";

import ProfileInfo from "@/components/profileInfo/profileInfo";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useTranslation } from "react-i18next";
import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";

const UserProfile = () => {
  const { t } = useTranslation();

  const BCrumb = [
    {
      to: "/",
      title: t("main"),
    },
    {
      title: t("profile"),
    },
  ] as any;

  const auth = getAuth(firebase_app) as any;
  return (
    <PageContainer title="Profile" description="this is profile">
      <Box mt={4}></Box>
      <Breadcrumb
        title={`${t("welcome")}${
          auth.currentUser?.displayName
            ? ", " + auth?.currentUser.displayName
            : "!"
        }`}
        items={BCrumb}
      />
      <Grid container spacing={3} mt={4}>
        <Grid item sm={12}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <ProfileInfo />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
