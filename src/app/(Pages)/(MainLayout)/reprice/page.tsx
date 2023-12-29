"use client";
import React, { useState, useEffect} from "react";
import { Box, Typography } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";
import AccountsReprice from "../../../../components/tables/accountsReprice";
import CreateNewAccount from "../../../../components/createNewAccount/createNewAccount";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useDispatch } from "@/shared/store/hooks";
import { getAccounts, getLimits } from "@/shared/store/slices/account/AccountSlice";
import { AppState } from "@/shared/store/store";
import { AppButton } from "@/shared/components/AppButton";

const Reprice = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false) as any;
  const [loading, setLoading] = useState(false) as any;
  const dispatch = useDispatch();

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
    await setLoading(true);
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
    <PageContainer title='Автоизменение цен | MarketDB' description='Автоизменение цен на маркетплейсах KazanExpress и Uzum'>
      <h1 className="text-[22px] mb-10 font-bold">Сервис автоматического изменения цен</h1>
      <Box mb={2} display={"flex"} gap={2} alignItems={"center"}>
        <AppButton tag="button" onClick={() => setOpen(true)}>
          Добавить аккаунт
        </AppButton>
        <Typography ml={1} variant='h6'>
          Осталось аккаунтов для добавления: {company.limits.keAccountLimitCurrent}
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
