"use client";
import { useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { Box, Container, Grid, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import {useQuery} from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { marketplace, period } from "../../categories/statics";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/20/solid";
import useDateRange from "@/hooks/useDateRange";
import { formatNumber } from "@/hooks/useFormatNumber";
import { ChartCard } from "@/components/chartLine";
import { axiosApi } from "@/api/axios/axios";
import { AppButton } from "@/shared/components/AppButton";
import clsx from "clsx";

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

function getDatesInRange(startDate: string, endDate: string) {
    const dateArray = [];
    const currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dateArray.push(new Date(currentDate).toISOString().split("T")[0]);  // Форматируем дату в формат YYYY-MM-DD
        currentDate.setDate(currentDate.getDate() + 1);  // Увеличиваем дату на один день
    }
    return dateArray;
}

export default function Product({ params }: { params: { productId: string } }) {
    const customizer = useSelector((state: AppState) => state.customizer);

    const [productData, setProductData] = useState<ProductStats>();
    const [showSkeleton, setShowSkeleton] = useState(true);

    const [periodDay,setPeriodDay] = useLocalStorage("period", "WEEK");
    const [market,] = useLocalStorage("market", marketplace[0]);
    const {startDate, endDate} = useDateRange(periodDay);

    const dateArray = getDatesInRange(startDate, endDate);

    const getProductStats = async () => {
        const url = `gateway/external-analytics/products/${params.productId}/stats?mp=${market.value}&startDate=${startDate}&endDate=${endDate}`;

        try {
            const response = await axiosApi.get<ProductStats>(url);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const { isLoading, isError, data } = useQuery({
        queryKey: ["product", startDate, endDate], 
        queryFn: getProductStats,
        enabled: !!startDate && !!endDate
    });

    useEffect(() => {
        if (data) {
            setProductData(data);
            setShowSkeleton(false);
        }
    }, [data]);

    if(isError) {
        return (
            <Container sx={{
                maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important"
            }}>
                <div className="flex gap-2 w-full mt-3">
                    {period.map((item, key) => (
                        <AppButton themeType="sorting" tag="button" key={key} onClick={() => setPeriodDay(item.period)} className={clsx("mdb-button-1", {
                            "mdb-button-1-active": periodDay === item.period
                            })}>
                            {item.text}
                        </AppButton>
                    ))}
                </div>
                <Box sx={{ flexGrow: 1 }}>
                    <b className="mt-3">Неизвестная ошибка! Попробуйте выбрать другой период.</b>
                </Box>
            </Container>
        );
    }

    return (
        <Container sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important"
        }}>
            <div className="flex gap-2 w-full mt-3">
                {period.map((item, key) => (
                    <AppButton themeType="sorting" tag="button" key={key} onClick={() => setPeriodDay(item.period)} className={clsx("mdb-button-1", {
                        "mdb-button-1-active": periodDay === item.period
                        })}>
                        {item.text}
                    </AppButton>
                ))}
            </div>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} className="!mt-0 prose lg:prose-base max-w-full prose-img:m-0 prose-h2:mb-0 prose-table:m-0">
                    <Grid item md={12} xs={12}>
                        <h2>{showSkeleton ? <Skeleton variant="text" /> : productData?.title}</h2>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-3 items-center">
                                {showSkeleton ? <Skeleton variant="rectangular" height={20} /> :
                                    <Link className="text-blueGray-600 hover:underline" href={market.value === "KE" ? `https://mm.ru/product/${productData?.product_id}` : `https://uzum.uz/product/${productData?.product_id}`}>Открыть на сайте</Link> 
                                }
                                {showSkeleton ? <Skeleton variant="rectangular" height={20} /> :
                                    <div className="flex gap-1 items-center text-base">
                                        <StarIcon width={14} height={15} fill="#ffb72c" className="relative top-[-1px]" />
                                        <span>{productData?.rating}</span>
                                    </div>
                                }
                                <div className="flex gap-1 items-center text-base text-[#979797]">
                                    {showSkeleton ? <Skeleton variant="rectangular" height={20} /> : <span>{productData?.reviews_amount} отзывов</span> }
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <div className="relative w-full h-[450px]">
                        {showSkeleton ? (
                            <Skeleton variant="rectangular" width="100%" height="450px" />
                        ) : (
                            <Image src={productData?.image_url as string} alt={productData?.title as string} fill/>
                        )}
                        </div>
                    </Grid>
                    <Grid item md={9} xs={12} spacing={2}>
                        <div className="flex flex-col gap-4">
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{width: "140px"}}>Категория</td>
                                        <td>
                                            {showSkeleton ? <Skeleton variant="text" /> :
                                                <Link href={market.value === "KE" ? "https://mm.ru/category/" + productData?.category.id : "https://uzum.uz/category/" + productData?.category.id}>
                                                    {productData?.category.name}
                                                </Link>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "140px"}}>Продавец</td>
                                        <td>
                                            {showSkeleton ? <Skeleton variant="text" /> :
                                                <Link href={market.value === "KE" ? "https://mm.ru/" + productData?.seller.seller_link : "https://uzum.uz/" + productData?.seller.seller_link}>
                                                    {productData?.seller.seller_title}
                                                </Link>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "140px"}}>Выручка</td>
                                        <td className="flex">
                                            {isLoading ? <Skeleton variant="rectangular" height={20} /> : <>{formatNumber(data?.revenue)} {productData?.mp === "KE" ? " ₽" : " сум"}</>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "140px"}}>Цена без скидки</td>
                                        <td className="flex">
                                            {showSkeleton && <Skeleton variant="rectangular" height={20} />} 
                                            {productData && formatNumber(productData.full_price / 100)} {productData?.mp === "KE" ? " ₽" : " сум"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "140px"}}>Цена со скидкой</td>
                                        <td className="flex">
                                            {showSkeleton && <Skeleton variant="rectangular" height={20} />}
                                            {productData && formatNumber(productData?.price / 100)} {productData?.mp === "KE" ? " ₽" : " сум"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "140px"}}>Обнаружено</td>
                                        <td>
                                            {showSkeleton ? <Skeleton variant="rectangular" height={20} /> : productData?.appear_at}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 mt-[20px] gap-5">
                            {isLoading ? <Skeleton variant="rectangular" height={181} /> : <ChartCard
                                data={data?.revenue_chart || []}
                                title="Выручка"
                                subtitle={true}
                                tooltipValue={market.value === "KE" ? "₽" : "Сум"}
                                formattedDates={dateArray}
                            />}
                            {isLoading ? <Skeleton variant="rectangular" height={181} /> :<ChartCard
                                data={data?.price_chart || []}
                                title="Цена со скидкой"
                                tooltipValue={market.value === "KE" ? "₽" : "Сум"}
                                formattedDates={dateArray}
                                lastIndex={true}
                            /> }
                            {isLoading ? <Skeleton variant="rectangular" height={181} /> : <ChartCard
                                data={data?.sales_chart || []}
                                title="Продажи, шт"
                                tooltipValue={"шт"}
                                subtitle={true}
                                formattedDates={dateArray}
                            /> }
                            {isLoading ? <Skeleton variant="rectangular" height={181} /> : <ChartCard
                                data={data?.remainings_chart || []}
                                title="Остатки"
                                tooltipValue={"шт"}
                                lastIndex={true}
                                formattedDates={dateArray}
                            />
                            }
                        </div>
                    </Grid>
                </Grid>
            </Box>

        </Container>
    );
};