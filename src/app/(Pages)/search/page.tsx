"use client";
import React from "react";
import { Box } from "@mui/material";
import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import Table5 from "@/components/tables/accountsReprice";

const BCrumb = [
  {
    to: "/",
    title: "Home"
  },
  {
    title: "Search Table"
  }
];

const SearchTable = () => {
  return (
    <PageContainer title='Search Table' description='this is Search Table'>
      {/* breadcrumb */}
      <Breadcrumb title='Search Table' items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <Table5 />
      </Box>
    </PageContainer>
  );
};

export default SearchTable;
