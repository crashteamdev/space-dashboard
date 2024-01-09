import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { Delete } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import firebase_app from "@/shared/firebase/firebase";
import { deleteAccount, syncAccount } from "@/shared/store/slices/account/AccountSlice";
import EditAccount from "../editAccount/editAccount";
import { AppButton } from "@/shared/components/AppButton";
import moment from "moment";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const RepricerAccountItem = ({ item, getFirstData }: any) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const auth = getAuth(firebase_app) as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const deleteHandler = async () => {
    await dispatch(deleteAccount(auth.currentUser.accessToken, company.activeCompany, item.id));
    await getFirstData();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const syncHandler = async () => {
    await dispatch(syncAccount(auth.currentUser.accessToken, company.activeCompany, item.id));
    await getFirstData();
  };

  return (
    <>
      <div className="card bg-white p-3 rounded-lg w-full max-w-[435px] relative dark:bg-blueGray-800">
        <div className="font-bold text-base relative">
          {item.login || item.email}
        </div>
        <div className="font-normal text-xs text-[gray] dark:text-white">
          {company.activeCompany === "ke" ? "KazanExpress" : "Uzum"}
        </div>
        <AppButton tag="a" href={`/reprice/${item.id}`} className="absolute right-3 top-3 !p-2 bg-blueGray-100">
          <NavigateNextIcon className="text-white" />
        </AppButton>
        <div className="flex flex-col gap-4 mt-4 mb-4">
            <div className="flex justify-between border-b border-[#909090] pb-0.5">
              <span className="text-sm text-[#909090] dark:text-white">Мониторинг:</span>
              <span className="text-blueGray-900 font-normal dark:text-white">{(item.monitorState === "suspended") ? "Выключен" : "Включен"}</span>
            </div>
            <div className="flex justify-between border-b border-[#909090] pb-0.5">
              <span className="text-sm text-[#909090] dark:text-white">Последнее обновление:</span>
              <span className="text-blueGray-900 font-normal dark:text-white">{item.lastUpdate ? moment(item.lastUpdate).format("DD.MM.YYYY") : "" }</span>
            </div>
            <div className="flex justify-between border-b border-[#909090] pb-0.5">
              <span className="text-sm text-[#909090] dark:text-white">Синхронизация с аккаунтом:</span>
              <span className="text-blueGray-900 font-normal dark:text-white">
                {item.initializeState === "error" && "Ошибка"}
                {item.initializeState === "finished" && "Синхронизировано"}
                {item.initializeState === "in_progress" && "В процессе"}
                {item.initializeState === "not_started" && "Не начато"}
              </span>
            </div>
        </div>
        <div className="flex justify-between items-center">
          <AppButton className="items-center" tag="button" themeType="primary" onClick={() => setOpen(!open)}>
            <SettingsIcon className="!w-[20px] !h-[20px] mr-2" />
            <span>Редактировать</span>
          </AppButton>
          <AppButton className="!p-2 bg-blueGray-100" tag="button" onClick={() => deleteHandler()}>
            <Delete className="text-white" />
          </AppButton>
        </div>
      </div>
      <EditAccount getFirstData={getFirstData} id={item.id} setOpen={setOpen} open={open} />
    </>
  );
};

export default RepricerAccountItem;
