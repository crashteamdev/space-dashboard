import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "@/store/hooks";
import { IconPower } from "@tabler/icons-react";
import { AppState } from "@/store/store";
import Link from "next/link";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { logout } from "@/app/api/auth/logout/logout";
import { getAuth } from "firebase/auth";
import firebase_app from "@/firebase/firebase";
import { deleteUser } from "@/store/user/userSlice";

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  const user = useSelector((state: AppState) => state.user);

  const dispatch = useDispatch();
  const auth = getAuth(firebase_app);

  const exit = () => {
    if (auth.currentUser) {
      dispatch(deleteUser());
    }
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt="Remy Sharp"
            src={user.data.photoURL ? user.data.photoURL : "/images/profile/user-1.jpg"}
            sx={{ height: 40, width: 40 }}
          />

          <Box>
            <Typography variant="h6">{user.data.displayName}</Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                component={Link}
                href="/auth/auth2/login"
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
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
