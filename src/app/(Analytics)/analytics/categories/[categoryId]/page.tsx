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
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { AppIcon } from "@/shared/components/AppIcon";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

interface IPropsCategory {
    name: string;
    mp: string;
    id: number;
    parent_id: number;
    childrens: number[];
}

const StyledTab = styled(Tab)`
    font-weight: 700;
    &.Mui-selected {
        color: #3E4784;
    }
`;

const StyledTabs = styled(TabList)`
    & .MuiTabs-indicator {
        background-color: #3E4784;
    }
`;

export default function Page({ params }: { params: { categoryId: string } }) {
    
    const [value, setValue] = React.useState("2");
    const [market,] = useLocalStorage("market", marketplace[0]);
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
        queryKey: ["catInfo", params], 
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
            <div className="px-[24px] py-[20px] flex flex-col gap-2">
                <div className="mb-[40px]">
                    <Link href="/analytics/categories/" className="flex gap-1 items-center w-max">
                        <ChevronLeftIcon width={20} height={20} />
                        Назад к списку категорий
                    </Link>
                </div>
                {isLoading 
                    ? <Skeleton variant="rectangular" height={20} width={200} />
                    : <Typography variant="h4" className="flex items-center gap-2">
                        Категория: {data?.name} 
                        {market.value === "KE" 
                            ? <Image src="/mm.png" alt="Магнит Маркет" width={20} height={20} /> 
                            : <Image src="/uzum.svg" alt="Магнит Маркет" width={20} height={20} /> 
                        }
                    </Typography>
                    
                }
                {isLoading 
                    ? <Skeleton variant="rectangular" height={20} width={200} />
                    : <Typography variant="subtitle1" className="font-semibold underline text-grayModern-400">
                        <Link className="flex gap-1 items-center w-max" target="_blank" href={market.value === "KE" ? `https://mm.ru/category/${data?.id}` : `https://uzum.uz/category/${data?.id}`}>
                            Категория на маркетплейсе
                            <AppIcon type="arrowTopRightOnSquare" className="w-4 h-4" />
                        </Link>
                    </Typography>
                }
            </div>
            <TabContext value={value}>
                <Box sx={{ 
                        padding: "0 24px",
                        border: "none"
                    }}>
                    <StyledTabs onChange={handleChange} className="border-b border-[#e5e7eb]">
                        <StyledTab label="Сводка" value="1" />
                        <StyledTab label="Продукты" value="2" />
                    </StyledTabs>
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