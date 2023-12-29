import { Tooltip } from "@mui/material";
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
import clsx from "clsx";

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
    <div className="mb-4">
      <div className="flex gap-4 justify-between">
        <div className="flex flex-col gap-2 bg-white rounded-[8px] p-3 w-1/5">
          <div className="text-[16px] font-semibold">Выбранный аккаунт:</div>
          <div>{data.login || data.email}</div>
          <Tooltip title='Изменить данные аккаунта'>
            <button onClick={() => setOpen(true)} className={clsx(
              "bg-blueGray-600 hover:bg-blueGray-700 flex items-center text-white",
              "rounded-[8px] px-2 py-1"
              )}>
              <IconEdit/>
              <span>Изменить данные аккаунта</span>
            </button>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-2 bg-white rounded-[8px] p-3 w-1/5">
          <div className="text-[16px] font-semibold">Последний обход:</div>
          <div>{date}</div>
        </div>
        <div className="flex flex-col gap-2 bg-white rounded-[8px] p-3 w-1/5">
          <div className="text-[16px] font-semibold">Мониторинг аккаунта:</div>
          <div>{data.monitorState === "active" ? "Активнен" : "Приостановлен"}</div>
          <Tooltip title={data.monitorState === "active" ? "Остановить мониторинг аккаунта" : "Включить мониторинг аккаунта"}>
            <button onClick={() => monitoringAccountHandler()} className={clsx(
              "bg-blueGray-600 hover:bg-blueGray-700 flex items-center text-white",
              "rounded-[8px] px-2 py-1"
              )} >
              {data.monitorState === "active" ? ( 
                <>
                  <IconPlayerPause/>
                  <span>Выключить</span>
                </>
              ) : (
                <>
                  <IconPlayerPlay/>
                  <span>Включить</span>
                </>
              )}
            </button>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-2 bg-white rounded-[8px] p-3 w-1/5">
          <div className="text-[16px] font-semibold relative flex items-center">
            Статус:
            <Tooltip className="ml-3" title='Запустить синхронизацию данных с системой'>
              <button onClick={() => syncAccountHandler()} >
                <IconRefresh/>
              </button>
            </Tooltip>
          </div>
          <div>{checkStatusAccount(data.updateState, data.lastUpdate, data.initializeState).title}</div>
        </div>
        <div className="flex flex-col gap-2 bg-white rounded-[8px] p-3 w-1/5">
          <div className="text-[16px] font-semibold">Товаров в пуле:</div>
          <div>{company.limits.itemPoolLimitCurrent} из {company.limits.itemPoolLimit}</div>
          <Link className={clsx(
              "bg-blueGray-600 hover:bg-blueGray-700 flex items-center text-white",
              "rounded-[8px] px-2 py-1"
              )} href={`/reprice/${accountId}/history`}>История изменения цен</Link>
        </div>
      </div>
      <EditAccount getFirstData={getFirstData} setOpen={setOpen} open={open} />
    </div>
  );
};

export default HeaderAccount;
