"use client";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import React, { HTMLAttributes, useEffect, useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import { formatNumber } from "@/hooks/useFormatNumber";
import { IProducts } from "../../../../types";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosApi } from "@/api/axios/axios";
import { useFilter } from "@/shared/hooks/useFilter";

type ITable = {
    market: string;
    category: {
        category: string;
    };
    period: string;
    sorting: string;
    filters: any;
    search: string;
} & HTMLAttributes<HTMLTableElement>;


const setting = {
    MAX_RANGE: 999999999,
    MIN_RANGE: 0,
    MAX_RATING: 5
};


export const Table = ({period, sorting, category, market, filters, search}: ITable ) => {

    const optionsrow1chart = useMemo(() => ({
        chart: {
            type: "area",
            foreColor: "#adb0bb",
            toolbar: { show: false },
            height: 35,
            width: 100,
            sparkline: { enabled: true },
            group: "sparklines",
        },
        stroke: { curve: "smooth", width: 2 },
        fill: { colors: ["#ECF2FF"], type: "solid", opacity: 0.05 },
        markers: { size: 0 },
        tooltip: { enabled: false },
    }), []);

    const [catalogData, setCatalogData] = useState<IProducts[]>([]);
    const [limit] = useState<number>(10);

    const filterString = useFilter({filters, search, setting});

    const GetProductsCatalog = async (page: number, limit: number, category: any, market: string, period: string, sorting: any): Promise<any> => {
        const sort = sorting && `&sort=${sorting}`;
        const filter = filterString !== undefined ? filterString : "";
        const url = `/gateway/external-analytics/categories/${category}/products/stats?mp=${market}&period=${period}&page=${page}&limit=${limit}` + sort + filter;

        try {
            const response = await axiosApi.get<any>(url);
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch product stats");
        }
    };

    const { data, isSuccess, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["productsCatalog", category, market, period, sorting, filters, search],
        queryFn: ({ pageParam = 0 }) => GetProductsCatalog(pageParam, limit, category.category, market, period, sorting),
        getNextPageParam: (lastPage, allPages) => {
            const nextPageOffset = allPages.length * limit;
            return lastPage.length < limit ? undefined : nextPageOffset;
        },
        initialPageParam: 0,
        staleTime: 1000 * 60 * 10
    });

    useEffect(() => {
        if(isSuccess && data?.pages) {
            const lastIndex = data?.pages.length;
            if(data?.pages.length == 1) {
                setCatalogData(data.pages[0]);
            } else {
                setCatalogData(prevData => [...prevData, ...data.pages[lastIndex - 1]]);
            }
        }
    }, [data?.pages, isSuccess, filters, search]);


    const columns = useMemo(() =>[
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
                                <Link className="text-blueGray-600 hover:underline" target="_blank" href={market === "KE" ? `https://mm.ru/product/${row.original.product_id}` : `https://uzum.uz/product/${row.original.product_id}`}>Открыть на сайте</Link>
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
            header: "График продаж",
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
                            options={optionsrow1chart as any}
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
    ], [market, optionsrow1chart]);

    const table = useReactTable({
        data: catalogData || [],
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
                    {isLoading ? (
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
            {!isLoading && 
                <div className="mt-5 flex justify-center">
                    {hasNextPage && 
                        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                            {isFetchingNextPage ? "Загрузка..." : "Загрузить еще"}
                        </button>
                    }
                </div>
            }
        </>
    );
};