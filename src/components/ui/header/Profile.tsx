import React, { useState } from "react";
import Link from "next/link";
import { Box, Menu, Avatar, Typography, Divider, Button, IconButton } from "@mui/material";
import * as dropdownData from "./data";

import { Stack } from "@mui/system";
import { logout } from "@/api/auth/logout/logout";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { setOpen } from "@/shared/store/slices/walletPopup/WalletPopupSlice";
import { useTranslation } from "react-i18next";
import { getCurrentUser } from "@/api/auth/getCurrentUser/getCurrentUser";

const Profile = () => {
  const user = getCurrentUser();
  const balanceReducer = useSelector((state: AppState) => state.balanceReducer) as any;

  const { t } = useTranslation();

  const dispatch = useDispatch();

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
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <Box>
      {user && 
      <>
        <IconButton
          size='large'
          aria-label='show 11 new notifications'
          color='inherit'
          aria-controls='msgs-menu'
          aria-haspopup='true'
          sx={{
            ...(typeof anchorEl2 === "object" && {
              color: "primary.main"
            })
          }}
          onClick={handleClick2}
        >
          <Avatar
            src={user.photoURL ? user.photoURL : "/images/profile/user-1.jpg"}
            alt={"ProfileImg"}
            sx={{
              width: 35,
              height: 35
            }}
          />
        </IconButton>
        {/* ------------------------------------------- */}
        {/* Message Dropdown */}
        {/* ------------------------------------------- */}
        <Menu
          id='msgs-menu'
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "360px",
              p: 4
            }
          }}
        >
          <Typography variant='h5'>Профиль</Typography>
          <Stack direction='row' pt={3} pb={2} spacing={2} alignItems='center'>
            <Avatar
              src={user.photoURL ? user.photoURL : "/images/profile/user-1.jpg"}
              alt={"ProfileImg"}
              sx={{ width: 64, height: 64 }}
            />
            <Box>
              <Typography variant='subtitle2' color='textPrimary' fontWeight={600}>
                {user ? user.email : ""}
              </Typography>
              <Typography variant='subtitle2' color='textSecondary'>
                {t("balance.title")}: {balanceReducer.amount} ₽
              </Typography>
            </Box>
          </Stack>
          <Stack direction='column' pb={3} spacing={2} alignItems='center'>
            <Button onClick={handleClickOpen} variant='contained' color='info' fullWidth>
              Пополнить баланс
            </Button>
          </Stack>
          <Divider />
          {dropdownData.profile.map((profile) => (
            <Box key={profile.title}>
              <Box sx={{ py: 2, px: 0 }} className='hover-text-primary'>
                <Link href={profile.href}>
                  <Stack direction='row' spacing={2}>
                    <Box
                      width='45px'
                      height='45px'
                      bgcolor='primary.light'
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      flexShrink='0'
                    >
                      <Avatar
                        src={profile.icon}
                        alt={profile.icon}
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: 0
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant='subtitle2'
                        fontWeight={600}
                        color='textPrimary'
                        className='text-hover'
                        noWrap
                        sx={{
                          width: "240px"
                        }}
                      >
                        {profile.title}
                      </Typography>
                      <Typography
                        color='textSecondary'
                        variant='subtitle2'
                        sx={{
                          width: "240px"
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
          <Button
            variant='contained'
            component={Link}
            href={"/auth/forgot-password"}
            color='primary'
            className="w-full"
          >
            {t("ChangePassword.button")}
          </Button>
          <Box mt={2}>
            <Button
              onClick={exit}
              href='/auth/login'
              variant='outlined'
              color='primary'
              component={Link}
              fullWidth
            >
              Выйти из аккаунта
            </Button>
          </Box>
        </Menu>
      </>
      }
    </Box>
  );
};

export default Profile;
