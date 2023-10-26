"use client"

import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

import TokenGenerator from '@/app/(DashboardLayout)/components/apps/userprofile/tokenGenerator/tokenGenerator';
import { getAuth } from "firebase/auth";
import firebase_app from "@/firebase/firebase";
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';

const UserProfile = () => {
  const { t } = useTranslation();

  const BCrumb = [
    {
      to: '/',
      title: t('main'),
    },
    {
      title: t('profile'),
    },
  ] as any;

  const auth = getAuth(firebase_app) as any;

  return (
    <PageContainer title="Profile" description="this is profile">
      <Box mt={4}>
      </Box>
      <Breadcrumb title={`${t("welcome")}${auth.currentUser.displayName ? ', ' + auth?.currentUser.displayName : '!'}`} items={BCrumb} />
      <Grid container spacing={3} mt={4}>
        {/* intro and Photos Card */}
        <Grid item sm={12}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <TokenGenerator />
            </Grid>
          </Grid>
        </Grid>
        {/* Posts Card */}
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
