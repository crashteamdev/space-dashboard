"use client";
import { useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { Container, Grid } from "@mui/material";
import React, { useMemo } from "react";
import {
    useQuery
  } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@uidotdev/usehooks";
import { marketplace } from "../../categories/statics";
import axios from "axios";
import Image from "next/image";

export default function Product({ params }: { params: { productId: string } }) {

    const customizer = useSelector((state: AppState) => state.customizer);

    const [periodDay, setPeriodDay] = useLocalStorage("period", "WEEK");
    const [market, setMarket] = useLocalStorage("market", marketplace[1]);

    const auth = getAuth(firebase_app) as any;
    const headers = useMemo(() => ({
        "Authorization": `Bearer ${auth.currentUser.accessToken}`,
        "X-Request-ID": uuidv4()
    }), [auth.currentUser.accessToken]);

    const getProductStats = async () => {
        const url = `https://api.marketdb.pro/gateway/external-analytics/products/${params.productId}/stats?mp=${market.value}&startDate=2024-04-12&endDate=2024-04-19`;

        try {
            const response = await axios.get(url, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch product stats");
        }
    };

    const { isLoading, isError, data } = useQuery({queryKey: ["product"], queryFn: getProductStats});

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching product stats</div>;
    console.log(data);
    return (
        <Container sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important"
        }}>
            <Grid container>
                <Grid item md={6} xs={12}>
                    <Image src={data.image_url} alt={data.title} width={300} height={400} />
                </Grid>
                <Grid item md={6} xs={12}>
                    
                </Grid>
            </Grid>
        </Container>
    );
};