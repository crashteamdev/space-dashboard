import React from "react";
import RepricerAccountItem from "../repricerAccountItem/repricerAccountItem";

const AccountsReprice = ({ data, getFirstData }: any) => {
  return (
    <div className="flex gap-6 flex-wrap">
      {data.length >= 1
        ? data.map((item: any, index: number) => {
            return <RepricerAccountItem getFirstData={getFirstData} key={index} item={item} />;
          })
        : "Ваши аккаунты не найдены"}
    </div>
  );
};

export default AccountsReprice;
