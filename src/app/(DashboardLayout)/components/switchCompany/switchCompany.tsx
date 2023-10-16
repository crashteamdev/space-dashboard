"use client";

import * as React from "react";
import { Grid, Box, Divider } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import ParentCard from "@/app/(DashboardLayout)/components/shared/ParentCard";
import ChildCard from "@/app/(DashboardLayout)/components/shared/ChildCard";
import { IconHeart, IconPhone, IconUser } from "@tabler/icons-react";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Tabs",
  },
];

const COMMON_TAB = [
  { value: '1', icon: '', label: 'KazanExpress', disabled: false },
  { value: '2', icon: '', label: 'Uzum', disabled: false },
];

const SwitchCompany = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box mt={2} justifyContent="space-between">
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {COMMON_TAB.map((tab: any, index: number) => (
            <Tab key={tab.value} label={tab.label} value={String(index + 1)} />
          ))}
        </TabList>
      </Box>
    </TabContext>
  );
};
export default SwitchCompany;
