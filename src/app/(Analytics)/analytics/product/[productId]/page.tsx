"use client";
import { useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { Box, Container, Grid, Skeleton } from "@mui/material";
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
import Link from "next/link";
import { StarIcon } from "@heroicons/react/20/solid";
import useDateRange from "@/hooks/useDateRange";

interface ProductStats {
    mp: string;
    product_id: number;
    title: string;
    image_url: string;
    seller: {
        seller_link: string;
        seller_title: string;
    };
    category: {
        id: number;
        name: string;
    };
    revenue: number;
    full_price: number;
    price: number;
    rating: number;
    reviews_amount: number;
    appear_at: string;
    price_chart: number[];
    revenue_chart: number[];
    sales_chart: number[];
    remainings_chart: number[];
}

export default function Product({ params }: { params: { productId: string } }) {

    const customizer = useSelector((state: AppState) => state.customizer);

    const [periodDay, setPeriodDay] = useLocalStorage("period", "WEEK");
    const [market, setMarket] = useLocalStorage("market", marketplace[1]);
    const {startDate, endDate} = useDateRange(periodDay);


    const auth = getAuth(firebase_app) as any;
    const headers = useMemo(() => ({
        "Authorization": `Bearer ${auth.currentUser.accessToken}`,
        "X-Request-ID": uuidv4()
    }), [auth.currentUser.accessToken]);

    const getProductStats = async () => {
        const url = `https://api.marketdb.pro/gateway/external-analytics/products/${params.productId}/stats?mp=${market.value}&startDate=${startDate}&endDate=${endDate}`;

        try {
            const response = await axios.get<ProductStats>(url, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch product stats");
        }
    };

    const { isLoading, isError, data } = useQuery({queryKey: ["product"], queryFn: getProductStats});

    if (isLoading) return (
        <Container sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important"
        }}>
            <Box sx={{ flexGrow: 1, paddingTop: 5 }}>
                <Grid container spacing={2}>
                    <Grid item md={12} xs={12}>
                        <Skeleton variant="rectangular" height={20} width={523} />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Skeleton variant="rectangular" height={400} />
                    </Grid>
                    <Grid item md={9} xs={12} spacing={2}>
                        <div className="flex flex-col gap-4">
                            <Skeleton variant="rectangular" height={20} />
                            <Skeleton variant="rectangular" height={20} />
                            <Skeleton variant="rectangular" height={20} />
                            <Skeleton variant="rectangular" height={20} />
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );

    if (isError) return <div>Error fetching product stats</div>;

    return (
        <Container sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important"
        }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} className="prose lg:prose-base max-w-full prose-img:m-0 prose-h2:mb-0 prose-table:m-0">
                    <Grid item md={12} xs={12}>
                        <Link href={`/analytics/categories/${data?.category.id}`}>
                            Вернуться в категорию
                        </Link>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <h2>{data?.title}</h2>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-3 items-center">
                                <Link className="text-blueGray-600 hover:underline" href={`https://kazanexpress.ru/product/${data?.product_id}`}>Открыть на сайте</Link>
                                <div className="flex gap-1 items-center text-base">
                                    <StarIcon width={14} height={15} fill="#ffb72c" className="relative top-[-1px]" />
                                    <span>{data?.rating}</span>
                                </div>
                                <div className="flex gap-1 items-center text-base text-[#979797]">
                                    <span>{data?.reviews_amount} отзывов</span>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <div className="relative w-full h-[450px]">
                            <Image src={data?.image_url as string} alt={data?.title as string} fill/>
                        </div>
                    </Grid>
                    <Grid item md={9} xs={12} spacing={2}>
                        <div className="flex flex-col gap-4">
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{width: "140px"}}>Категория</td>
                                        <td>
                                            <Link href={"https://kazanexpress.ru/category/" + data?.category.id}>{data?.category.name}</Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "140px"}}>Продавец</td>
                                        <td>
                                            <Link href={"https://kazanexpress.ru/" + data?.seller.seller_link}>{data?.seller.seller_title}</Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "140px"}}>Цена без скидки</td>
                                        <td>
                                            {data?.full_price} {data?.mp === "KE" ? " ₽" : " сум"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "140px"}}>Цена со скидкой</td>
                                        <td>
                                            {data?.price} {data?.mp === "KE" ? " ₽" : " сум"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "140px"}}>Обнаружено</td>
                                        <td>
                                            {data?.appear_at}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                                <b>Скоро добавим еще много нового...</b>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};