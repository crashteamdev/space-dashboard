import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { Alert, AlertTitle, Collapse } from "@mui/material";
import React, { memo, useCallback, useEffect } from "react";
import { removeItem } from "@/shared/store/slices/alerts/AlertsSlice";

const AlertItem = ({ item }: any) => {
  const [open, setOpen] = React.useState(true);

  const alerts = useSelector((state: AppState) => state.alertsReducer.list);
  const dispatch = useDispatch();

  const memoizedCallback = useCallback(() => {
    const timerAnim = setTimeout(() => {
      setOpen(false);
    }, item.timelife - 500);
    const timer = setTimeout(() => {
      dispatch(removeItem());
    }, item.timelife);
    return () => {
      clearTimeout(timer);
      clearTimeout(timerAnim);
    };
  }, []);

  memoizedCallback();

  return (
    <Collapse in={open}>
      <Alert 
        variant="filled"
        severity={item.status}
        onClick={() => setOpen(false)}
        sx={{ mb: 1 }}
      >
        <AlertTitle>{item.title}</AlertTitle>
        {item?.description}
      </Alert>
    </Collapse>
  );
};

export default memo(AlertItem);
