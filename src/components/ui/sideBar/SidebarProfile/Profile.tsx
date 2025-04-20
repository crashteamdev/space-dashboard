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
import { logout } from "@/api/auth/logout/logout";
import { getCurrentUser } from "@/api/auth/getCurrentUser/getCurrentUser";

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : "";

  const user = getCurrentUser();

  const exit = () => {
    logout();
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
          {user &&
          <>
            <Avatar
              alt='Remy Sharp'
              src={user.photoURL ? user.photoURL : "/images/profile/user-1.jpg"}
              sx={{ height: 40, width: 40 }}
            />

            <Box>
              <div
                className="text-black-800 font-semibold"
              >
                {user.displayName
                  ? user.displayName
                  : user.email
                  ? user.email
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
          }

        </>
      ) : (
        ""
      )}
    </Box>
  );
};
