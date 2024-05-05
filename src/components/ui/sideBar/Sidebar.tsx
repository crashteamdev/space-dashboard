import React from "react";
import { useMediaQuery, Box, Drawer, useTheme } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { useSelector, useDispatch } from "@/shared/store/hooks";
import {
  hoverSidebar,
  toggleMobileSidebar
} from "@/shared/store/slices/customizer/CustomizerSlice";
import Scrollbar from "@/components/ui/custom-scroll/Scrollbar";
import { AppState } from "@/shared/store/store";
// import styles from "./style/sidebar.module.scss";
import { AppTelegramWidget } from "@/components/AppTelegramWidget";
// import clsx from "clsx";
import Link from "next/link";
import { AppIcon } from "@/shared/components/AppIcon";
import clsx from "clsx";

const Sidebar = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();
  const theme = useTheme();
  const toggleWidth =
    customizer.isCollapse && !customizer.isSidebarHover
      ? customizer.MiniSidebarWidth
      : customizer.SidebarWidth;

  const onHoverEnter = () => {
    if (customizer.isCollapse) {
      dispatch(hoverSidebar(false));
    }
  };

  const onHoverLeave = () => {
    dispatch(hoverSidebar(false));
  };

  if (lgUp) {
    return (
      <Box
        // className="z-50 w-full max-w-[270px] flex-shrink-0"
        sx={{
            zIndex: 100,
            width: toggleWidth,
            flexShrink: 0,
            ...(customizer.isCollapse && {
              position: "absolute",
            }),
        }}
      >
        <Drawer
            anchor="left"
            open
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
            variant="permanent"
            PaperProps={{
              sx: {
                borderRight: "1px solid #535263",
                background: "#393848",
                transition: theme.transitions.create("width", {
                  duration: theme.transitions.duration.shortest,
                }),
                width: toggleWidth,
                boxSizing: "border-box",
              },
            }}
          >
          <Box px={3}>
            <Link href="/" className={clsx("flex items-center h-[69px]", {

            })}>
              {!customizer.isCollapse ? (
                <AppIcon type="logo" color="white" />
              )
              : 
              (
                <svg width="37" height="27" viewBox="0 0 37 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_225_327)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M26.1468 2.96054C26.9872 2.92848 27.6589 2.2378 27.6589 1.36764C27.6589 0.497482 26.9551 -0.226562 26.0866 -0.226562C25.2182 -0.226562 24.5144 0.754672 24.5144 1.36764C24.5144 1.98061 24.6228 2.03279 24.807 2.2939L19.4248 11.7462C19.2456 11.6744 19.0503 11.6349 18.8459 11.6349C18.6415 11.6349 18.4463 11.6744 18.2673 11.7462L15.0581 6.11037C15.0796 6.00507 15.091 5.89586 15.091 5.78422C15.091 4.90381 14.3872 4.19002 13.5188 4.19002C12.6505 4.19002 11.9465 4.90381 11.9465 5.78422C11.9465 5.89418 11.9577 6.00172 11.9787 6.10534C8.57352 12.0846 5.16671 18.0628 1.76156 24.0421C1.72406 24.0393 1.68638 24.0378 1.64852 24.0378C0.779995 24.0378 0.0761719 24.7514 0.0761719 25.6318C0.0761719 26.5124 0.779995 27.226 1.64852 27.226C2.51685 27.226 3.22067 26.5124 3.22067 25.6318C3.22067 25.3498 3.14844 25.0848 3.0216 24.855L13.0227 7.29717C13.1786 7.34973 13.3453 7.37824 13.5188 7.37824C13.6922 7.37824 13.8591 7.34973 14.0148 7.29736L17.2846 13.04C17.2775 13.1018 17.2738 13.165 17.2738 13.2289C17.2738 14.1093 17.9776 14.8231 18.8459 14.8231C19.7143 14.8231 20.4183 14.1093 20.4183 13.2289C20.4183 13.165 20.4144 13.102 20.4073 13.04L26.1468 2.96054Z" fill="white" />
                      <path opacity="0.3" d="M14.7823 5.62542L18.8463 12.7624L22.9205 5.60772C23.3188 4.90492 24.2035 4.66264 24.8965 5.0665C25.1332 5.20441 25.3171 5.39973 25.4404 5.62542C28.99 11.8591 32.5387 18.0855 36.0887 24.3194C36.4902 25.0222 36.2536 25.9218 35.5606 26.3286C35.3312 26.4634 35.0809 26.5271 34.8336 26.5269V26.5301C20.232 26.5301 17.4605 26.5301 2.85887 26.5301C2.05616 26.5301 1.40527 25.8702 1.40527 25.0563C1.40527 24.7514 1.49644 24.4679 1.65324 24.2329C5.1889 18.024 8.72676 11.8166 12.2622 5.60772C12.6606 4.90492 13.5454 4.66264 14.2384 5.0665C14.475 5.20441 14.6588 5.39973 14.7823 5.62542Z" fill="white"/>
                      <path d="M14.7823 5.62539L18.8463 12.7626L22.9203 5.6075C23.3188 4.90507 24.2035 4.6626 24.8967 5.06647C25.1332 5.20438 25.3171 5.39988 25.4404 5.62539L25.4648 5.66788L21.166 13.2175L21.1662 13.2289C21.1662 13.8762 20.9063 14.4638 20.4866 14.8893L20.4839 14.8922C20.064 15.3177 19.485 15.5811 18.8463 15.5811C18.2077 15.5811 17.6283 15.3177 17.2087 14.8922L17.2057 14.8893C16.7863 14.4638 16.5263 13.8762 16.5263 13.2289L16.5265 13.2173L13.6316 8.13299L13.5192 8.13634L13.4079 8.13318L3.85367 24.9068L3.89209 25.0404C3.9419 25.2359 3.96874 25.4344 3.96874 25.6318C3.96874 25.9497 3.90606 26.2531 3.79246 26.5301H2.85887C2.05597 26.5301 1.40527 25.8701 1.40527 25.0563C1.40527 24.7514 1.49644 24.4679 1.65324 24.2329C5.1889 18.024 8.72676 11.8166 12.2624 5.6075C12.6604 4.90507 13.5454 4.6626 14.2384 5.06647C14.475 5.20438 14.6588 5.39988 14.7823 5.62539Z" fill="white"/>
                  </g>
                </svg>  
              )}
            </Link>
          </Box>
          <Scrollbar sx={{ height: "calc(100%)"}}>
            <SidebarItems />
          </Scrollbar>
          {!customizer.isCollapse && 
            <AppTelegramWidget />
          }
        </Drawer>
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
