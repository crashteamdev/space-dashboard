import { Box, Button, Grid, Theme, Tooltip, Typography } from "@mui/material";
import React, {useState, useEffect} from "react";
import { IconChartAreaLine, IconRefresh, IconEdit } from "@tabler/icons-react";
import { getAccount, syncAccount } from "@/shared/store/slices/account/AccountSlice";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { useParams } from "next/navigation";

const HeaderAccount = () => {

  const dispatch = useDispatch();

  const { accountId } = useParams() as any;
  
  const [data, setData] = useState({}) as any;
  const auth = getAuth(firebase_app) as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const syncAccountHandler = () => {
    dispatch(syncAccount(auth.currentUser.accessToken, company.activeCompany, accountId))
  }

  const getFirstData = async () => {
    const data = await dispatch(
      getAccount(auth.currentUser.accessToken, company.activeCompany, accountId)
    );
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getFirstData();
  }, []);
  
  const dateObject = new Date(data?.lastUpdate);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Месяцы начинаются с 0
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

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
        overflow: "hidden",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          fontWeight={500}
          color="textPrimary"
          className="text-hover"
          noWrap
        >
          Аккаунт: <b>{data.email}</b> | Последний обход: <b>{day}.{month}.{year} {hours}:{minutes}</b>
        </Typography>
      </Box>

      <Box
        mt={2}
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Tooltip title="Изменить данные аккаунта">
          <Button color="primary" variant="contained" type="submit">
            <IconEdit />
          </Button>
        </Tooltip>
        <Tooltip title="Обновить аккаунт">
          <Button color="primary" variant="contained" type="submit">
            <IconRefresh />
          </Button>
        </Tooltip>
        <Tooltip title="Запустить мониторинг">
          <Button onClick={() => syncAccountHandler()} color="primary" variant="contained" type="submit">
            <IconChartAreaLine />
          </Button>
        </Tooltip>
        <Button color="primary" variant="contained" type="submit">
          История изменения цен
        </Button>
      </Box>
    </Grid>
  );
};

export default HeaderAccount;
