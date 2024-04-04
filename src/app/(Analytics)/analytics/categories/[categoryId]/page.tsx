"use client";
import React  from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { StatsCategory } from "./components/StatsCategory";
import { Products } from "./components/Products";

export default function Page({ params }: { params: { categoryId: string } }) {
    const [value, setValue] = React.useState("1");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Сводка" value="1" />
                    <Tab label="Продукты" value="2" />
                </TabList>
                </Box>
                <TabPanel value="1">
                    <StatsCategory category={params.categoryId} />
                </TabPanel>
                <TabPanel value="2">
                    <Products category={params.categoryId} />
                </TabPanel>
            </TabContext>
        </Box>
    );
};