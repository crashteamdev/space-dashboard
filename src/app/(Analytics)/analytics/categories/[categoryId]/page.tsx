"use client";
import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { StatsCategory } from "./components/StatsCategory";
import { Products } from "./components/Products";
import { v4 as uuidv4 } from "uuid";
import firebase_app from "@/shared/firebase/firebase";
import { getAuth } from "firebase/auth";
import { useLocalStorage } from "@uidotdev/usehooks";
import { marketplace } from "../statics";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";

interface IPropsCategory {
    name: string;
    mp: string;
    id: number;
    parent_id: number;
    childrens: number[];

}

export default function Page({ params }: { params: { categoryId: string } }) {
    const [value, setValue] = React.useState("1");
    const [market,] = useLocalStorage("market", marketplace[1]);
    const auth = getAuth(firebase_app) as any;
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    
    const headers = {
        "Authorization": `Bearer ${auth.currentUser.accessToken}`,
        "X-Request-ID": uuidv4()
    };

    const getCategoriesInfo = async () => {
        const url = `https://api.marketdb.pro/gateway/external-analytics/categories/${params.categoryId}/info?mp=${market.value}`;

        try {
            const response = await axios.get<IPropsCategory>(url, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch product stats");
        }
    };

    const { isLoading, isError, data } = useQuery({
        queryKey: ["catInfo"], 
        queryFn: getCategoriesInfo,
        staleTime: 1000 * 60 * 10
    });
    
    if(isError) {
        return (
            <Box sx={{ width: "100%", typography: "body1" }}>Не удалось загрузить данные</Box>
        );
    }

    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <div className="p-5">
                {isLoading 
                    ? <Skeleton variant="rectangular" height={20} width={200} />
                    : <div className="mdb-heading-1">Категория: {data?.name}</div>
                    
                }
            </div>
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