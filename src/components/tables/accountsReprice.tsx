import React, { Suspense, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  CardContent,
  Divider,
  Tooltip,
  IconButton,
  styled
} from "@mui/material";
import BlankCard from "../ui/shared/BlankCard";
import { Stack } from "@mui/system";
import { Edit, Delete, Refresh } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import firebase_app from "@/shared/firebase/firebase";
import {
  deleteAccount,
  getAccounts,
  syncAccount
} from "@/shared/store/slices/account/AccountSlice";

const AccountsReprice = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const auth = getAuth(firebase_app) as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const getFirstData = async () => {
    const data = await dispatch(getAccounts(auth.currentUser.accessToken, company.activeCompany));
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getFirstData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AppBarStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    maxWidth: "300px"
  })) as any;

  return (
    <Box display={"flex"} gap={"24px"} flexWrap={"wrap"}>
      <Suspense fallback={"Loading..."}>
        {data.map((item: any) => {
          const dateObject = new Date(item.lastUpdate);
          const year = dateObject.getFullYear();
          const month = dateObject.getMonth() + 1; // Месяцы начинаются с 0
          const day = dateObject.getDate();
          const hours = dateObject.getHours();
          const minutes = dateObject.getMinutes();
          return (
            <Grid style={{ cursor: "pointer" }} item sm={12} lg={12} key={item.id}>
              <BlankCard className='hoverCard'>
                <CardContent component={Link} href={`/reprice/${item.id}`}>
                  <Stack direction={"column"} gap={2} alignItems='center'>
                    <Box padding={"6px 24px"} textAlign={"center"}>
                      <AppBarStyled variant='h5'>{item.email}</AppBarStyled>
                    </Box>
                    <Box>
                      <AppBarStyled variant='h6'>Последнее обновление:</AppBarStyled>
                      <AppBarStyled variant='h6'>
                        {day}.{month}.{year} {hours}:{minutes}
                      </AppBarStyled>
                    </Box>
                  </Stack>
                </CardContent>
                <Divider />
                <Box p={2} py={1} textAlign={"center"} sx={{ backgroundColor: "grey.100" }}>
                  <Box justifyContent={"space-between"} display='flex' gap={2}>
                    {/* Редактирование */}
                    <Tooltip title='Редактировать'>
                      <IconButton color='primary'>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    {/* Перезагрузка */}
                    <Tooltip title='Синхронизация с базой KazanExpress'>
                      <IconButton
                        onClick={() =>
                          dispatch(
                            syncAccount(
                              auth.currentUser.accessToken,
                              company.activeCompany,
                              item.id
                            )
                          )
                        }
                        color='info'
                      >
                        <Refresh />
                      </IconButton>
                    </Tooltip>
                    {/* Удаление */}
                    <Tooltip title='Удалить'>
                      <IconButton
                        onClick={() =>
                          dispatch(
                            deleteAccount(
                              auth.currentUser.accessToken,
                              company.activeCompany,
                              item.id
                            )
                          )
                        }
                        color='error'
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </BlankCard>
            </Grid>
          );
        })}
      </Suspense>
    </Box>
  );
};

export default AccountsReprice;
