import { useState, useEffect } from "react";
import MenuitemsKazan from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List, useMediaQuery, Grid, Divider } from "@mui/material";
import { useDispatch, useSelector } from "@/store/hooks";
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import NavGroup from "./NavGroup/NavGroup";
import { AppState } from "@/store/store";
import { toggleMobileSidebar } from "@/store/customizer/CustomizerSlice";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ChildCard from "@/app/(DashboardLayout)/components/shared/ChildCard";
import TabPanel from "@mui/lab/TabPanel";
import SwitchCompany from "@/app/(DashboardLayout)/components/switchCompany/switchCompany";
import Wallet from "@/app/(DashboardLayout)/components/wallet/wallet";

const SidebarItems = () => {
  const [value, setValue] = useState("1");
  const companyChanger = useSelector((state: AppState) => state.companyChanger);

  const pathname = usePathname();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu: any = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";
  const dispatch = useDispatch();

  console.log(companyChanger)
  
  return (
    <Box sx={{ px: 3 }}>
      <Box>
        <Wallet />
        <SwitchCompany />
      </Box>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {MenuitemsKazan[companyChanger.activeCompany].map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return (
              <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />
            );

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
