import React, { useEffect } from "react";
import {
  Avatar,
  Typography,
  Box,
  Grid,
  CardContent,
  Divider,
  ListItemIcon,
  Tooltip,
  IconButton,
} from "@mui/material";
import BlankCard from "../ui/shared/BlankCard";
import { basicsTableData, AccountsType } from "./accountsRepriceData";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { IconEdit, IconRefresh, IconTrash } from "@tabler/icons-react";
import styles from "./accountsReprice.module.scss";
import { Edit, Delete, Refresh } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import firebase_app from "@/shared/firebase/firebase";
import { getAccounts } from "@/shared/store/slices/account/AccountSlice";

const basics: AccountsType[] = basicsTableData;

const AccountsReprice = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const auth = getAuth(firebase_app) as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const accounts = useSelector((state: AppState) => state.accountReducer) as any;

  useEffect(() => {
    dispatch(
      getAccounts(
        auth.currentUser.accessToken,
        company.activeCompany,
      )
    );
    console.log(accounts)
  }, [])

  return (
    <Box display={"flex"} gap={"24px"} flexWrap={"wrap"}>
      {basics.map((item) => {
        return (
          <Grid
            style={{ cursor: "pointer" }}
            item
            component={Link}
            href={'/reprice/userid'}
            sm={12}
            lg={12}
            key={item.id}
          >
            <BlankCard className="hoverCard">
              <CardContent>
                <Stack direction={"column"} gap={4} alignItems="center">
                  <Box padding={"6px 24px"} textAlign={"center"}>
                    <Typography variant="h5">{item.email}</Typography>
                  </Box>
                </Stack>
              </CardContent>
              <Divider />
              <Box
                p={2}
                py={1}
                textAlign={"center"}
                sx={{ backgroundColor: "grey.100" }}
              >
                <Box justifyContent={"space-between"} display="flex" gap={2}>
                  {/* Редактирование */}
                  <Tooltip title="Редактировать">
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  {/* Перезагрузка */}
                  <Tooltip title="Перезагрузить">
                    <IconButton color="info">
                      <Refresh />
                    </IconButton>
                  </Tooltip>
                  {/* Удаление */}
                  <Tooltip title="Удалить">
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </BlankCard>
          </Grid>
        );
      })}
    </Box>
  );
};

export default AccountsReprice;
