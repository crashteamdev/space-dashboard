"use client";

import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { useDispatch } from "@/shared/store/hooks";
import { changeCompany } from "@/shared/store/slices/companyChanger/CompanyChangerSlice";

const COMMON_TAB = [
  { value: "1", icon: "", label: "KazanExpress", ul: "ke", disabled: false },
  { value: "2", icon: "", label: "Uzum", ul: "uzum", disabled: false },
];

const SwitchCompany = () => {
  const [value, setValue] = React.useState('ke') as any;

  const dispatch = useDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
    dispatch(changeCompany(newValue));
    if (localStorage.getItem("switch-company")) {
      localStorage.setItem("switch-company", newValue);
    } else {
      localStorage.setItem("switch-company", "ke");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("switch-company")) {
      dispatch(changeCompany(localStorage.getItem("switch-company")));
      setValue(localStorage.getItem("switch-company"));
    } else {
      localStorage.setItem("switch-company", "ke");
      setValue("ke");
      dispatch(changeCompany("ke"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TabContext value={value}>
      <Box mt={2} justifyContent="space-between">
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {COMMON_TAB.map((tab: any, index: number) => (
            <Tab key={tab.value} label={tab.label} value={tab.ul} />
          ))}
        </TabList>
      </Box>
    </TabContext>
  );
};
export default SwitchCompany;