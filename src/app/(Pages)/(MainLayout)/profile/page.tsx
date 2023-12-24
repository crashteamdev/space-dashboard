"use client";
import React from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";

import ProfileInfo from "@/components/profileInfo/profileInfo";

const UserProfile = () => {
  return (
    <PageContainer title='Profile' description='this is profile'>
      <Box mt={4}></Box>
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
