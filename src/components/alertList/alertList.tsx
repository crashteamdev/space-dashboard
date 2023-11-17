import { useSelector } from "@/shared/store/hooks";
import React from "react";
import styles from "./alertList.module.scss";
import { AppState } from "@/shared/store/store";
import AlertItem from "./alertItem/alertItem";

const AlertList = ({ children }: any) => {

  const alerts = useSelector((state: AppState) => state.alertsReducer.list);
  
  return (
    <div>
      <div className={styles.container}>
        {alerts.map((item: any, index: number) => {
          return (
            <>
              <AlertItem key={index} item={item} />
            </>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default AlertList;
