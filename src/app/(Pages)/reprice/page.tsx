"use client";
import React, { useState, useEffect} from "react";
import { Box, Typography } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";
import AccountsReprice from "@/components/tables/accountsReprice";
import CreateNewAccount from "@/components/createNewAccount/createNewAccount";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useDispatch as useReduxDispatch } from "react-redux";
import { getAccounts, getLimits } from "@/shared/store/slices/account/AccountSlice";
import { AppState } from "@/shared/store/store";
import { AppButton } from "@/shared/components/AppButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Link from "next/link";

const Reprice = () => {
  const [data, setData] = useState() as any;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useReduxDispatch();

  const auth = getAuth(firebase_app) as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const getFirstData = async () => {
    const data = await dispatch(getAccounts(auth.currentUser.accessToken, company.activeCompany));
    console.log(data);
    if (data.length >= 1) {
      setData(data);
    } else {
      setData([]);
    }
    setLoading(true);
  };

  const getLimitsData = () => {
    dispatch(getLimits(auth.currentUser.accessToken, company.activeCompany));
  };

  useEffect(() => {
    setData([]);
    setLoading(false);
    getLimitsData();
    getFirstData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company.activeCompany]);

  return (
    <PageContainer title='Автоизменение цен | MarketDB' description='Автоизменение цен на маркетплейсах Магнит Маркет и Uzum'>
      <div className="mb-10">
        <h1 className="text-[22px] font-bold">Сервис автоматического изменения цен</h1>
        <Link target="_blank" className="flex items-center gap-1 mt-2" href="https://doc.marketdb.pro/documentation/repricer.html">
          <span className="text-grayModern-500 text-[14px]">Инструкция</span>
          <BookmarkIcon className="!w-[17px] !h-[17px] !fill-blueGray-600" />
        </Link>
      </div>
      <Box mb={2} display={"flex"} gap={2} alignItems={"center"}>
        <AppButton tag="button" onClick={() => setOpen(true)}>
          Добавить аккаунт
        </AppButton>
        <Typography ml={1} variant='h6'>
          Осталось аккаунтов для добавления: {company.limits.accountLimitCurrent}
        </Typography>
        <CreateNewAccount getFirstData={getFirstData} data={data} open={open} setOpen={setOpen} />
      </Box>
      {loading ? (
        <AccountsReprice data={data} getFirstData={getFirstData} />
      ) : (
        <Typography ml={1} variant='h6'>
          Загрузка данных
        </Typography>
      )}
    </PageContainer>
  );
};

export default Reprice;
