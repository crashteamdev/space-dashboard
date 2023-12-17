import React from "react";
import { Box } from "@mui/material";
import RepricerAccountItem from "../repricerAccountItem/repricerAccountItem";

const AccountsReprice = ({ data, getFirstData }: any) => {
  return (
    <Box display={"flex"} gap={"24px"} flexWrap={"wrap"}>
      {data
        ? data.map((item: any, index: number) => {
            return <RepricerAccountItem getFirstData={getFirstData} key={index} item={item} />;
          })
        : "Ваши аккаунты не найдены"}
    </Box>
  );
};

export default AccountsReprice;