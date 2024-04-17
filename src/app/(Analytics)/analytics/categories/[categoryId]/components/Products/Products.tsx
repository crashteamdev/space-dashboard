import React, { useEffect, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { IProducts } from "../../types";
import firebase_app from "@/shared/firebase/firebase";
import { getAuth } from "@firebase/auth";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import { StarIcon } from "@heroicons/react/20/solid";
import { formatNumber } from "@/hooks/useFormatNumber";
import { period } from "../../../statics";
import { AppButton } from "@/shared/components/AppButton";
import clsx from "clsx";
import { useLocalStorage } from "@uidotdev/usehooks";

export const Products = (category: any) => {
    const urlCategoriesStats = `https://api.marketdb.pro/gateway/external-analytics/categories/${category.category}/products/stats`;
    const query = "?mp=KE&period=WEEK&page=0&limit=20";

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<IProducts[]>([]);
    const auth = getAuth(firebase_app) as any;
    
    const [periodDay, setPeriodDay] = useLocalStorage("period", "WEEK");

    const headers = {
        "Authorization": `Bearer ${auth.currentUser.accessToken}`,
        "X-Request-ID": uuidv4()
    };

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch(urlCategoriesStats + query, {
                method: "GET",
                headers: headers
            });
            const data = await response.json();
            setData(data);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };
        setLoading(true);
        getCategories();
    }, []);

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
            cell: () => {
                return (
                    <div className="relative">
                        <div>
                        {/* <ChartBar 
                                title=""
                                datasets={[
                                    {
                                        label: "",
                                        data: getValue(),
                                        backgroundColor: "red"
                                    }
                                ]} labels={[]}                    /> */}
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
            <div className="heading-layout">
                <div className="mdb-heading-1">Категории</div>
                <div className="flex gap-3 justify-between">
                    <div className="flex gap-2 w-full">
                    {period.map((item, key) => (
                        <AppButton themeType="sorting" tag="button" key={key} onClick={() => setPeriodDay(item.period)} className={clsx("mdb-button-1", {
                            "mdb-button-1-active": periodDay === item.period
                        })}>
                            {item.text}
                        </AppButton>
                    ))}
                    </div>
                    {/* тут сортирофка и фильтр можно */}
                </div>
            </div>
            <table className="mdb-table">
                <thead className="mdb-table-thead">
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
            <div className="mt-5 flex justify-center">
                <AppButton themeType="sorting" tag="button" 
                className={
                    clsx("mdb-button-1")
                }>
                    Загрузить еще
                </AppButton>
            </div>
        </>
    );
};