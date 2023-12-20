import { Box, Button, Grid, Theme, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { IconRefresh, IconEdit, IconPlayerPause,IconPlayerPlay } from "@tabler/icons-react";
import { getAccount, getLimits, syncAccount } from "@/shared/store/slices/account/AccountSlice";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { useParams } from "next/navigation";
import Link from "next/link";
import EditAccount from "../editAccount/editAccount";
import { changeMonitoringAccount } from "@/shared/store/slices/reprice/repriceSlice";
import { format } from "date-fns";

const checkStatusAccount = (status: any, lastUpdate: any, initializeState: any) => {
  if (status === "finished" && initializeState === "finished") {
    return {
      title: "Синхронизирован с базой",
      status: "active"
    };
  } else if (status === "not_started" && lastUpdate === null && initializeState !== "error") {
    return {
      title: "Мы включаем ваш аккаунт в нашу базу данных, необходимо подождать",
      status: "progress"
    };
  } else if (status === "not_started" && lastUpdate) {
    return {
      title: "идет синхронизация с личным кабинетом",
      status: "progress"
    };
  } else if (status === "in_progress") {
    return {
      title: "Синхронизация с личным кабинетом, необходимо подождать",
      status: "progress"
    };
  } else if (initializeState === "error") {
    return {
      title: "Произошла ошибка при синхронизация, попробуйте повторить",
      status: "error"
    };
  } else {
    return {
      title: "Произошла ошибка",
      status: "error"
    };
  }
};

const HeaderAccount = () => {
  const dispatch = useDispatch();

  const { accountId } = useParams() as any;

  const [open, setOpen] = useState(false) as any;

  const theme = useTheme();
  const [data, setData] = useState({}) as any;
  const [date, setDate] = useState("") as any;
  const auth = getAuth(firebase_app) as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const syncAccountHandler = async () => {
    dispatch(syncAccount(auth.currentUser.accessToken, company.activeCompany, accountId));
    await getFirstData();
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
    setData(data);
    setDate(data.lastUpdate ? format(new Date(data.lastUpdate), "yyyy-MM-dd HH:mm") : "");
  };

  const getLimitsData = () => {
    dispatch(getLimits(auth.currentUser.accessToken, company.activeCompany));
  };

  useEffect(() => {
    getLimitsData();
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
          {data.login || data.email ? <Typography
            variant='h6'
            fontWeight={500}
            color='textPrimary'
            className='text-hover'
            noWrap
          >
            Аккаунт: <b>{data.login || data.email}</b>
          </Typography> : null}
          {date ? <Typography
            variant='h6'
            fontWeight={500}
            color='textPrimary'
            className='text-hover'
            noWrap
          >
            Последний обход: <b>{date}</b>
          </Typography> : null}
          {data.monitorState ? <Typography
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
          </Typography> : null}
          {data.initializeState ? <Typography
            display={"flex"}
            variant='h6'
            fontWeight={500}
            color='textPrimary'
            className='text-hover'
            noWrap
          >
            Статус:{" "}
            <Typography
              ml={1}
              variant='h6'
              sx={{
                color:
                  checkStatusAccount(data.updateState, data.lastUpdate, data.initializeState)
                    .status === "active"
                    ? (theme) => theme.palette.success.main
                    : (theme) => theme.palette.error.main,
                borderRadius: "100%"
              }}
            >
              {" "}
              {checkStatusAccount(data.updateState, data.lastUpdate, data.initializeState).title}
            </Typography>
          </Typography> : "Загрузка..."}
          {company.limits.itemPoolLimit ? <Typography
            display={"flex"}
            variant='h6'
            fontWeight={500}
            color='textPrimary'
            className='text-hover'
            noWrap
          >
            Осталось добавлений в пул:{" "}
            <Typography
              ml={1}
              variant='h6'
              color={theme.palette.info.main}
              sx={{
                borderRadius: "100%"
              }}
            >
              {""}
              {company.limits.itemPoolLimitCurrent}
            </Typography>
          </Typography> : null}
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
        <Tooltip title={data.monitorState === "active" ? "Остановить мониторинг аккаунта" : "Включить мониторинг аккаунта"}>
          <Button
            onClick={() => monitoringAccountHandler()}
            color='primary'
            variant='contained'
            type='submit'
          >
            {
              data.monitorState === "active" ? <IconPlayerPause /> : <IconPlayerPlay />
            }
          </Button>
        </Tooltip>
        <Tooltip title='Запустить синхронизацию данных с системой'>
          <Button
            onClick={() => syncAccountHandler()}
            color='primary'
            variant='contained'
            type='submit'
          >
            <IconRefresh />
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
      <EditAccount getFirstData={getFirstData} setOpen={setOpen} open={open} />
    </Grid>
  );
};

export default HeaderAccount;
