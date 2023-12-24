import { useDispatch } from "@/shared/store/hooks";
import { Alert, AlertTitle, Collapse } from "@mui/material";
import React, { memo, useCallback } from "react";
import { removeItem } from "@/shared/store/slices/alerts/AlertsSlice";

const AlertItem = ({ item }: any) => {
  const [open, setOpen] = React.useState(true);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  memoizedCallback();

  if (!item.description) {
    <Collapse key={item.title} in={open}>
      <Alert variant='filled' severity={item.status} onClick={() => setOpen(false)} sx={{ mb: 1 }}>
        {item.title}
      </Alert>
    </Collapse>;
  }

  return (
    <Collapse key={item.title} in={open}>
      <Alert variant='filled' severity={item.status} onClick={() => setOpen(false)} sx={{ mb: 1 }}>
        <AlertTitle>{item.title}</AlertTitle>
        {item?.description}
      </Alert>
    </Collapse>
  );
};

export default memo(AlertItem);
