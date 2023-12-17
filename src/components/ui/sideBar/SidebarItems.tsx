import React from "react";
import MenuitemsKazan from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import NavGroup from "./NavGroup/NavGroup";
import { AppState } from "@/shared/store/store";
import { toggleMobileSidebar } from "@/shared/store/slices/customizer/CustomizerSlice";
import SwitchCompany from "@/components/switchCompany/switchCompany";
import Wallet from "@/components/wallet/wallet";

const SidebarItems = () => {
  const companyChanger = useSelector((state: AppState) => state.companyChanger);

  const pathname = usePathname();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu: any = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : "";
  const dispatch = useDispatch();

  return (
    <Box sx={{ px: 3 }}>
      <Box sx={{ pt: 0 }}>
        <Wallet hideMenu={hideMenu} />
        <SwitchCompany />
      </Box>
      <List sx={{ pt: 0 }} className='sidebarNav'>
        {MenuitemsKazan[companyChanger.activeCompany].map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
