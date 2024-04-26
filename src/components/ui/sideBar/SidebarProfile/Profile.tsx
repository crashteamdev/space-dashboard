import React from "react";
import {
  Box,
  Avatar,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "@/shared/store/hooks";
import { IconPower } from "@tabler/icons-react";
import { AppState } from "@/shared/store/store";
import Link from "next/link";
import { useDispatch as useReduxDispatch } from "react-redux";
import { logout } from "@/api/auth/logout/logout";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { deleteUser } from "@/shared/store/slices/user/userSlice";

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : "";

  const user = useSelector((state: AppState) => state.user);

  const dispatch = useReduxDispatch();
  const auth = getAuth(firebase_app);

  const exit = () => {
    if (auth.currentUser) {
      dispatch(deleteUser());
    }
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  return (
    // <ProfileUpgrade />
    <Box
      display={"flex"}
      alignItems='center'
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt='Remy Sharp'
            src={user.data.photoURL ? user.data.photoURL : "/images/profile/user-1.jpg"}
            sx={{ height: 40, width: 40 }}
          />

          <Box>
            <div
              className="text-black-800 font-semibold"
            >
              {user.data.displayName
                ? user.data.displayName
                : user.data.email
                ? user.data.email
                : ""}
            </div>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title='Logout' placement='top'>
              <IconButton
                color='primary'
                onClick={exit}
                component={Link}
                href='/auth/login'
                aria-label='logout'
                size='small'
              >
                <IconPower size='20' />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
