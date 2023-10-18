"use client";

import React, {useEffect} from "react";
import { Grid, Box, Divider } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { IconHeart, IconPhone, IconUser } from "@tabler/icons-react";
import { useDispatch } from "@/store/hooks";
import { changeCompany } from "@/store/apps/companyChanger/CompanyChangerSlice";

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
  { value: "1", icon: "", label: "KazanExpress", disabled: false },
  { value: "2", icon: "", label: "Uzum", disabled: false },
];

const SwitchCompany = () => {
  const [value, setValue] = React.useState(localStorage.getItem("switch-company")) as any;

  const dispatch = useDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
    dispatch(changeCompany(newValue));
    console.log(localStorage.getItem("switch-company"));
    if (localStorage.getItem("switch-company")) {
      localStorage.setItem("switch-company", newValue);
    } else {
      localStorage.setItem("switch-company", "KazanExpress");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("switch-company")) {
      dispatch(changeCompany(localStorage.getItem("switch-company")));
      setValue(localStorage.getItem("switch-company"))
    } else {
      localStorage.setItem("switch-company", "KazanExpress");
      setValue("KazanExpress")
      dispatch(changeCompany('KazanExpress'));
    }
  }, [])

  return (
    <TabContext value={value}>
      <Box mt={2} justifyContent="space-between">
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {COMMON_TAB.map((tab: any, index: number) => (
            <Tab key={tab.value} label={tab.label} value={tab.label} />
          ))}
        </TabList>
      </Box>
    </TabContext>
  );
};
export default SwitchCompany;
