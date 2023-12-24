"use client";
import React from "react";
import { Grid } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";
import TokenContainer from "../../../../components/tokenContainer";

const Extension = () => {
  return (
    <PageContainer title='Extension' description='this is extension'>
      {/* <Box mt={4}></Box> */}
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
