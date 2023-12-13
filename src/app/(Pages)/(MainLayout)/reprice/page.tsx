"use client";
import React, { useState, useEffect} from "react";
import { Box, Button, Typography } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";
import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";
import { t } from "i18next";
import AccountsReprice from "../../../../components/tables/accountsReprice";
import CreateNewAccount from "../../../../components/createNewAccount/createNewAccount";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useDispatch } from "@/shared/store/hooks";
import { getAccounts } from "@/shared/store/slices/account/AccountSlice";
import { AppState } from "@/shared/store/store";

const BCrumb = [
  {
    to: "/",
    title: t("main")
  },
  {
    title: "Управление ценами"
  }
] as any;

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
    }
    await setLoading(true);
  };

  useEffect(() => {
    getFirstData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer title='Master settings' description='Master settings'>
      <Box mt={4}></Box>
      <Breadcrumb title={"Управление ценами"} items={BCrumb} />
      <Box mb={2}>
        <Button variant='contained' onClick={() => setOpen(true)} color='primary'>
          Добавить аккаунт
        </Button>
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
