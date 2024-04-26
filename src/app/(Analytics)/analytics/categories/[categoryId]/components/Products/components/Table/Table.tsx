"use client";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import React, { HTMLAttributes, useEffect, useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { getAuth } from "@firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import { formatNumber } from "@/hooks/useFormatNumber";
import { IProducts } from "../../../../types";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";
import { AppButton } from "@/shared/components/AppButton";
import clsx from "clsx";

type ITable = {
    market: string;
    category: {
        category: string;
    };
    period: string;
    sorting: string;
    filters: any;
} & HTMLAttributes<HTMLTableElement>;

const createFilterQueryString = (filters: any) => {
    // Проверяем и формируем фильтр для выручки
    const revenueRange = filters.revenueRange && filters.revenueRange.length === 2
        ? `revenue:${filters.revenueRange[0]}..${filters.revenueRange[1]}`
        : "";

    // Проверяем и формируем фильтр для количества заказов
    const orderAmountRange = filters.orderAmountRange && filters.orderAmountRange.length === 2
        ? `order_amount:${filters.orderAmountRange[0]}..${filters.orderAmountRange[1]}`
        : "";

    // Проверяем и формируем фильтр для цены
    const priceRange = filters.priceRange && filters.priceRange.length === 2
        ? `price:${filters.priceRange[0]}..${filters.priceRange[1]}`
        : "";

    // Проверяем и формируем фильтр для доступного количества
    const availableAmountRange = filters.availableAmountRange && filters.availableAmountRange.length === 2
        ? `available_amount:${filters.availableAmountRange[0]}..${filters.availableAmountRange[1]}`
        : "";

    // Проверяем и формируем фильтр для рейтинга
    const rating = filters.rating && filters.rating.length === 2
        ? `rating:${filters.rating[0]}..${filters.rating[1]}`
        : "";

    // Проверяем и формируем фильтр для количества отзывов
    const reviewsAmount = filters.reviewsAmount && filters.reviewsAmount.length === 2
        ? `reviews_amount:${filters.reviewsAmount[0]}..${filters.reviewsAmount[1]}`
        : "";

    // Создаём итоговую строку запроса, добавляя только те фильтры, которые не пусты
    const filterString = [
        revenueRange,
        orderAmountRange,
        priceRange,
        availableAmountRange,
        rating,
        reviewsAmount
    ].filter(Boolean).join(";");

    return filterString ? `&filter=${filterString}` : "";
};

export const Table = ({period, sorting, category, market, filters}: ITable ) => {

    const optionsrow1chart: any = {
        chart: {
          type: "area",
        //   fontFamily:
          foreColor: "#adb0bb",
          toolbar: {
            show: false,
          },
          height: 35,
          width: 100,
          sparkline: {
            enabled: true,
          },
          group: "sparklines",
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        fill: {
          colors: ["#ECF2FF"],
          type: "solid",
          opacity: 0.05,
        },
        markers: {
          size: 0,
        },
        tooltip: {
          enabled: true,
        },
    };

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const [data, setData] = useState<IProducts[]>([]);
    const [page, setPage] = useState<number>(0);
    const [limit, ] = useState<number>(20);
    const auth = getAuth(firebase_app) as any;

    const urlCategoriesStats = `https://api.marketdb.pro/gateway/external-analytics/categories/${category.category}/products/stats`;
    const query = `?mp=${market}&period=${period}&page=${page}&limit=${limit}`;
    const sort = sorting && `&sort=${sorting}`;

    const filterString = createFilterQueryString(filters);

    const headers = useMemo(() => ({
        "Authorization": `Bearer ${auth.currentUser.accessToken}`,
        "X-Request-ID": uuidv4()
    }), [auth.currentUser.accessToken]);

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch(urlCategoriesStats + query + sort + filterString.slice(0, -1), {
                method: "GET",
                headers: headers
            });
            const data = await response.json();
            setData(prevData => [...prevData, ...data]);
            setLoading(false);
            setLoadingButton(false);
        };
        if(data.length === 0) {
            setLoading(true);
        }
        getCategories();
    }, [period, sorting, page, filters]);

    const loadNextPage = () => {
        setLoadingButton(true);
        setPage(prevPage => prevPage + 20); // Увеличиваем значение page на 20
    };

    const columns = [
        {
            accessorKey: "title",
            header: "Название",
            cell: ({ row, getValue}: any) => {
                return (
                    <div className="flex gap-3">
                        <div 
                            className="rounded-md overflow-hidden w-full max-w-[35px] h-[40px] relative"
                        >
                            <Image src={row.original.image_url} alt={row.original.title} fill/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Link className="text-sm hover:underline" target="_blank" href={`/analytics/product/${row.original.product_id}`}>
                                {getValue()}
                            </Link>
                            <div className="flex gap-3 items-center">
                                <Link className="text-blueGray-600 hover:underline" href={`https://kazanexpress.ru/product/${row.original.product_id}`}>Открыть на сайте</Link>
                                <div className="flex gap-1 items-center text-xs">
                                    <StarIcon width={14} height={15} fill="#ffb72c" className="relative top-[-1px]" />
                                    {row.original.rating}
                                </div>
                                <div className="flex gap-1 items-center text-xs text-[#979797]">
                                    {row.original.reviews_amount}
                                    <span> отзывов</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "revenue",
            header: "Выручка",
            cell: ({ getValue }: any) => {
                return (
                    <div className="relative">
                        <div>
                            {formatNumber(getValue())}
                            {/* <span className="text-[10px] text-[gray]">{row.original.mp === "KE" ? "₽" : "Сум"}</span> */}
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "order_amount",
            header: "Продажи, шт",
            cell: ({ getValue }: any) => {
                return (
                    <div className="relative">
                        <div>
                            {formatNumber(getValue())}
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "price",
            header: "Цена",
            cell: ({ getValue }: any) => {
                return (
                    <div className="relative">
                        <div>
                            {formatNumber(getValue())}
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "available_amount",
            header: "Остатки, шт",
            cell: ({ getValue }: any) => {
                return (
                    <div className="relative">
                        <div>
                            {formatNumber(getValue())}
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "sales_chart",
            header: "График",
            cell: ({row}: any) => {
                const seriesrow1chart = [
                    {
                        // name: "Customers",
                        color: "#556cd6",
                        data: row.original.sales_chart,
                    },
                ];
                return (
                    <div className="relative">
                        <div>
                        <Chart
                            options={optionsrow1chart}
                            series={seriesrow1chart}
                            type="area"
                            height="35px"
                            width="100px"
                        />
                        </div>
                    </div>
                );
            }
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <table className="mdb-table">
                <thead className="mdb-table-thead !sticky top-2 z-50">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th className="py-2" key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="mdb-table-tbody">
                    {loading ? (
                        <>
                            {columns.map((item, key) => (
                                <React.Fragment key={key}>
                                    <tr>
                                        {columns.map((item, key) => (
                                            <th key={key}>
                                                <Skeleton variant="rectangular" height={20} />
                                            </th>
                                        ))}
                                    </tr>
                                </React.Fragment>
                            ))}
                        </>
                    ) 
                    :
                    <>
                        {table.getRowModel().rows.map(row => (
                            <>
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <th key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </>
                        ))}
                    </>
                    }
                </tbody>
            </table>
            {!loading && 
                <div className="mt-5 flex justify-center">
                    <AppButton themeType="sorting" tag="button" 
                        onClick={loadNextPage}
                        loading={loadingButton}
                        className={
                            clsx("mdb-button-1")
                    }>
                        Загрузить еще
                    </AppButton>
                </div>
            }
        </>
    );
};