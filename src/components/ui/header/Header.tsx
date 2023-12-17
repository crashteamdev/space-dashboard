import React from "react";
import { IconButton, Box, AppBar, useMediaQuery, Toolbar, styled, Stack } from "@mui/material";
import { useSelector, useDispatch } from "@/shared/store/hooks";
import { toggleMobileSidebar } from "@/shared/store/slices/customizer/CustomizerSlice";
import { IconMenu2 } from "@tabler/icons-react";
import Profile from "./Profile";
import Language from "./Language";
import { AppState } from "@/shared/store/store";
import SwitchTheme from "@/components/switchTheme/SwitchTheme";

const Header = () => {
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));

  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: customizer.TopbarHeight
    }
  })) as any;
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary
  })) as any;

  return (
    <AppBarStyled position='sticky' color='default'>
      <ToolbarStyled>
        {lgDown ? (
          <IconButton
            color='inherit'
            aria-label='menu'
            onClick={() => dispatch(toggleMobileSidebar())}
          >
            <IconMenu2 />
          </IconButton>
        ) : (
          ""
        )}
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Box flexGrow={1} />
        <Stack spacing={1} direction='row' alignItems='center'>
          <SwitchTheme />
          <Language />
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
