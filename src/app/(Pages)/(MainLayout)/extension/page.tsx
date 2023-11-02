"use client";

import { Grid, Box } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";
import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useTranslation } from "react-i18next";
import TokenContainer from "../../../../components/tokenContainer";

const Extension = () => {
  const { t } = useTranslation();

  const BCrumb = [
    {
      to: "/",
      title: t("main"),
    },
    {
      title: t("extension.informationTitle"),
    },
  ] as any;

  const auth = getAuth(firebase_app) as any;

  return (
    <PageContainer title="Extension" description="this is extension">
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
              <TokenContainer />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Extension;