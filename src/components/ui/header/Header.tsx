import React from "react";
import { IconButton, Box, AppBar, useMediaQuery, Toolbar, styled, Stack } from "@mui/material";
import { useSelector, useDispatch } from "@/shared/store/hooks";
import { toggleMobileSidebar, toggleSidebar } from "@/shared/store/slices/customizer/CustomizerSlice";
import { IconMenu2 } from "@tabler/icons-react";
import Profile from "./Profile";
import Language from "./Language";
import { AppState } from "@/shared/store/store";
import SwitchTheme from "@/components/switchTheme/SwitchTheme";

const Header = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  // const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));

  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    // boxShadow: "none",
    // background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    // marginBottom: "10px",
    [theme.breakpoints.up("lg")]: {
      minHeight: customizer.TopbarHeight
    }
  })) as any;
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary
  })) as any;

  return (
    <AppBarStyled position='static' color='default' className="!bg-black-800 border-b-[1px] border-[#535263]">
      <ToolbarStyled>
        {!lgUp &&
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={lgUp ? () => dispatch(toggleSidebar()) : () => dispatch(toggleMobileSidebar())}
          >
            <IconMenu2 size="20" color="white" />
          </IconButton>
        }
        <Box flexGrow={1}>
          {/* <Typography variant="h3">Профиль</Typography> */}
        </Box>
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
