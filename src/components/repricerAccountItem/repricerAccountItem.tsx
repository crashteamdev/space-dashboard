import React, { useState } from "react";
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
import { deleteAccount, syncAccount } from "@/shared/store/slices/account/AccountSlice";
import EditAccount from "../editAccount/editAccount";

const RepricerAccountItem = ({ item, getFirstData }: any) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const auth = getAuth(firebase_app) as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const deleteHandler = async () => {
    await dispatch(deleteAccount(auth.currentUser.accessToken, company.activeCompany, item.id));
    await getFirstData();
  };

  const syncHandler = async () => {
    await dispatch(syncAccount(auth.currentUser.accessToken, company.activeCompany, item.id));
    await getFirstData();
  };

  const AppBarStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    maxWidth: "300px"
  })) as any;
  return (
    <Grid style={{ cursor: "pointer" }} item sm={12} lg={12} key={item.id}>
      <BlankCard className='hoverCard'>
        <CardContent component={Link} href={`/reprice/${item.id}`}>
          <Stack direction={"column"} gap={0} alignItems='center'>
            <Box padding={"6px 24px"} textAlign={"center"}>
              <AppBarStyled variant='h5'>Аккаунт</AppBarStyled>
            </Box>
            <Box padding={"6px 24px"} textAlign={"center"}>
              <AppBarStyled variant='h5'>{item.email}</AppBarStyled>
            </Box>
            <Box padding={"6px 24px"} textAlign={"center"}>
              <AppBarStyled
                sx={{
                  color:
                    item.monitorState === "active"
                      ? (theme: any) => theme.palette.success.main
                      : (theme: any) => theme.palette.error.main,
                }}
                variant='h5'
              >
                {item.monitorState === "active" ? "Активнен" : "Приостановлен"}
              </AppBarStyled>
            </Box>
          </Stack>
        </CardContent>
        <Divider />
        <Box p={2} py={1} textAlign={"center"} sx={{ backgroundColor: "grey.100" }}>
          <Box justifyContent={"space-between"} display='flex' gap={2}>
            {/* Редактирование */}
            <Tooltip title='Редактировать'>
              <IconButton onClick={() => setOpen(!open)} color='primary'>
                <Edit />
              </IconButton>
            </Tooltip>
            {/* Перезагрузка */}
            <Tooltip title='Синхронизация с базой KazanExpress'>
              <IconButton onClick={() => syncHandler()} color='info'>
                <Refresh />
              </IconButton>
            </Tooltip>
            {/* Удаление */}
            <Tooltip title='Удалить'>
              <IconButton onClick={() => deleteHandler()} color='error'>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </BlankCard>
      <EditAccount getFirstData={getFirstData} id={item.id} setOpen={setOpen} open={open} />
    </Grid>
  );
};

export default RepricerAccountItem;
