import React from "react";
import { useMediaQuery, Box, Drawer } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { useSelector, useDispatch } from "@/shared/store/hooks";
import {
  toggleMobileSidebar
} from "@/shared/store/slices/customizer/CustomizerSlice";
import Scrollbar from "@/components/ui/custom-scroll/Scrollbar";
import { AppState } from "@/shared/store/store";
import styles from "./style/sidebar.module.scss";
import { AppTelegramWidget } from "@/components/AppTelegramWidget";
import clsx from "clsx";
import Link from "next/link";
import { AppIcon } from "@/shared/components/AppIcon";

const Sidebar = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  if (lgUp) {
    return (
      <Box
        className="z-50 w-full max-w-[270px] flex-shrink-0"
        sx={{
          ...(customizer.isCollapse && {
            position: "absolute"
          })
        }}
      >
        <Box
          className={clsx(
            "bg-black-800",
            styles.sidebar
          )}
          sx={{
            height: "100%",
            width: "270px",
            position: "fixed"
          }}
        >
          <Box px={3}>
            <Link href="/" className="pt-4 block">
              <AppIcon type="logo" color="white" />
            </Link>
          </Box>
          <Scrollbar sx={{}}>
            <SidebarItems />
          </Scrollbar>
          <AppTelegramWidget />
        </Box>
      </Box>
    );
  }

  return (
    <Drawer
      anchor='left'
      open={customizer.isMobileSidebar}
      onClose={() => dispatch(toggleMobileSidebar())}
      variant='temporary'
      PaperProps={{
        sx: {
          width: customizer.SidebarWidth,
          border: "0 !important",
          boxShadow: (theme) => theme.shadows[8],
          bgcolor: "#393848"
        }
      }}
    >
      <Box px={2}>
        <Link href="/" className="pt-4 block">
          <AppIcon type="logo" color="white" />
        </Link>
      </Box>
      <SidebarItems />
      <AppTelegramWidget />
    </Drawer>
  );
};

export default Sidebar;
