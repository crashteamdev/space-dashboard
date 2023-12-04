import { Box, Button, Grid, Theme, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { IconChartAreaLine, IconRefresh, IconEdit } from "@tabler/icons-react";
import { getAccount, syncAccount } from "@/shared/store/slices/account/AccountSlice";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { useParams } from "next/navigation";
import Link from "next/link";
import EditAccount from "../editAccount/editAccount";
import { changeMonitoringAccount } from "@/shared/store/slices/reprice/repriceSlice";
import { format } from "date-fns";

const HeaderAccount = () => {
  const dispatch = useDispatch();

  const { accountId } = useParams() as any;

  const [open, setOpen] = useState(false) as any;

  const [data, setData] = useState({}) as any;
  const [date, setDate] = useState("") as any;
  const auth = getAuth(firebase_app) as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const syncAccountHandler = () => {
    dispatch(syncAccount(auth.currentUser.accessToken, company.activeCompany, accountId));
  };
  const monitoringAccountHandler = async () => {
    await dispatch(
      changeMonitoringAccount(auth.currentUser.accessToken, company.activeCompany, accountId, {
        state: data.monitorState === "suspended" ? "activate" : "suspend"
      })
    );
    await getFirstData();
  };

  const getFirstData = async () => {
    const data = await dispatch(
      getAccount(auth.currentUser.accessToken, company.activeCompany, accountId)
    );
    console.log(data);
    setData(data);
    setDate(format(new Date(data.lastUpdate), "yyyy-MM-dd HH:mm"));
  };

  useEffect(() => {
    getFirstData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "secondary.light",
        borderRadius: (theme: Theme) => theme.shape.borderRadius / 4,
        p: "30px 25px 20px",
        marginBottom: "30px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <Typography variant='h6' fontWeight={500} color='textPrimary' className='text-hover' noWrap>
          Аккаунт: <b>{data.email}</b>
        </Typography>
        <Typography variant='h6' fontWeight={500} color='textPrimary' className='text-hover' noWrap>
          Последний обход: <b>{date}</b>
        </Typography>
        <Typography
          display={"flex"}
          variant='h6'
          fontWeight={500}
          color='textPrimary'
          className='text-hover'
          noWrap
        >
          Мониторинг аккаунта:{" "}
          <Typography
            ml={1}
            variant='h6'
            sx={{
              color:
                data.monitorState === "active"
                  ? (theme) => theme.palette.success.main
                  : (theme) => theme.palette.error.main,
              borderRadius: "100%"
            }}
          >
            {" "}
            {data.monitorState === "active" ? "Активнен" : "Приостановлен"}
          </Typography>
        </Typography>
      </Box>

      <Box
        mt={2}
        sx={{
          display: "flex",
          gap: "20px"
        }}
      >
        <Tooltip title='Изменить данные аккаунта'>
          <Button onClick={() => setOpen(true)} color='primary' variant='contained' type='submit'>
            <IconEdit />
          </Button>
        </Tooltip>
        <Tooltip title='Переключить состояние мониторинга аккаунта'>
          <Button
            onClick={() => monitoringAccountHandler()}
            color='primary'
            variant='contained'
            type='submit'
          >
            <IconRefresh />
          </Button>
        </Tooltip>
        <Tooltip title='Запустить синхронизацию данных с системой'>
          <Button
            onClick={() => syncAccountHandler()}
            color='primary'
            variant='contained'
            type='submit'
          >
            <IconChartAreaLine />
          </Button>
        </Tooltip>
        <Button
          component={Link}
          href={`/reprice/${accountId}/history`}
          color='primary'
          variant='contained'
          type='submit'
        >
          История изменения цен
        </Button>
      </Box>
      <EditAccount setOpen={setOpen} open={open} />
    </Grid>
  );
};

export default HeaderAccount;
