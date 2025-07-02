"use client";

import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { useDispatch } from "@/shared/store/hooks";
import { changeCompany } from "@/shared/store/slices/companyChanger/CompanyChangerSlice";
import styled from "./switchCompany.module.scss";
import { useRouter } from "next/navigation";

const COMMON_TAB = [
  { value: "1", icon: "", label: "Магнит Маркет", ul: "ke", disabled: false }
];

const SwitchCompany = () => {
  const [value, setValue] = React.useState("ke") as any;
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
    dispatch(changeCompany(newValue));

    const regex = /\/reprice\//;
    const url = window.location.pathname;
    regex.test(url) && router.push("/reprice");
    
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
      <Box mt={2} justifyContent='space-between'>
        <TabList onChange={handleChange} aria-label='lab API tabs example'>
          {COMMON_TAB.map((tab: any) => (
            <Tab className={styled.color} key={tab.value} label={tab.label} value={tab.ul} />
          ))}
        </TabList>
      </Box>
    </TabContext>
  );
};
export default SwitchCompany;
