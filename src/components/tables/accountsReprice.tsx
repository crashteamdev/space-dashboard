import React, { Suspense } from "react";
import { Box } from "@mui/material";
import RepricerAccountItem from "../repricerAccountItem/repricerAccountItem";

const AccountsReprice = ({ data, getFirstData }: any) => {
  return (
    <Box display={"flex"} gap={"24px"} flexWrap={"wrap"}>
      <Suspense fallback={"Loading..."}>
        {data.map((item: any, index: number) => {
          return <RepricerAccountItem getFirstData={getFirstData} key={index} item={item} />;
        })}
      </Suspense>
    </Box>
  );
};

export default AccountsReprice;
