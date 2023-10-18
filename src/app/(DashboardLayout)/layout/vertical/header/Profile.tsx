import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import * as dropdownData from "./data";

import { Stack } from "@mui/system";
import Image from "next/image";
import { logout } from "@/app/api/auth/logout/logout";
import { useDispatch, useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { getAuth } from "firebase/auth";
import firebase_app from "@/firebase/firebase";
import { deleteUser } from "@/store/user/userSlice";
import { setOpen } from "@/store/apps/walletPopup/WalletPopupSlice";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const user = useSelector((state: AppState) => state.user);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const auth = getAuth(firebase_app);

  const handleClickOpen = () => {
    dispatch(setOpen(true));
  };

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const exit = () => {
    if (auth.currentUser) {
      dispatch(deleteUser());
    }
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={user.data.photoURL ? user.data.photoURL : "/images/profile/user-1.jpg"}
          alt={"ProfileImg"}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 4,
          },
        }}
      >
        <Typography variant="h5">Профиль</Typography>
        <Stack direction="row" pt={3} pb={2} spacing={2} alignItems="center">
          <Avatar
            src={
              user.data.photoURL
                ? user.data.photoURL
                : "/images/profile/user-1.jpg"
            }
            alt={"ProfileImg"}
            sx={{ width: 64, height: 64 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              fontWeight={600}
            >
              {user.data ? user.data.email : ""}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {t("balance.title")}: {100}₽
            </Typography>
          </Box>
        </Stack>
        <Stack direction="column" pb={3} spacing={2} alignItems="center">
          <Button onClick={handleClickOpen} variant="contained" color="info" fullWidth>
            Пополнить баланс
          </Button>
        </Stack>
        <Divider />
        {dropdownData.profile.map((profile) => (
          <Box key={profile.title}>
            <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
              <Link href={profile.href}>
                <Stack direction="row" spacing={2}>
                  <Box
                    width="45px"
                    height="45px"
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink="0"
                  >
                    <Avatar
                      src={profile.icon}
                      alt={profile.icon}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="textPrimary"
                      className="text-hover"
                      noWrap
                      sx={{
                        width: "240px",
                      }}
                    >
                      {profile.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: "240px",
                      }}
                      noWrap
                    >
                      {profile.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))}
        <Box mt={2}>
          <Button
            onClick={exit}
            href="/auth/auth2/login"
            variant="outlined"
            color="primary"
            component={Link}
            fullWidth
          >
            Выйти из аккаунта
        </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
