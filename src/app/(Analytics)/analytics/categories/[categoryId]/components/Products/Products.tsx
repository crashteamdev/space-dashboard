import React, { useEffect, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { IProducts } from "../../types";
import firebase_app from "@/shared/firebase/firebase";
import { getAuth } from "@firebase/auth";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export const Products = (category: any) => {
    const urlCategoriesStats = `https://api.marketdb.pro/gateway/external-analytics/categories/${category.category}/products/stats`;
    const query = "?mp=KE&period=WEEK&page=1";

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<IProducts[]>([]);
    const auth = getAuth(firebase_app) as any;
    
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
                    <div>
                        <Link href={`/analytics/categories/${row.original.id}`}>
                            {getValue()}
                        </Link>
                    </div>
                );
            },
        },
        {
            accessorKey: "product_id",
            header: "ProductID",
        },
        {
            accessorKey: "mp",
            header: "Маркетплейс",
        },
        {
            accessorKey: "image_url",
            header: "Изображение",
        },
        {
            accessorKey: "revenue",
            header: "Выручка",
        },
        {
            accessorKey: "order_amount",
            header: "Продажи, шт",
        },
        {
            accessorKey: "price",
            header: "Цена",
        },
        {
            accessorKey: "available_amount",
            header: "Остатки, шт",
        },
        {
            accessorKey: "rating",
            header: "Рейтинг",
        },
        {
            accessorKey: "reviews_amount",
            header: "Отзывов",
        },
        {
            accessorKey: "sales_chart",
            header: "График",
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });


    if(loading) {
        return (
            <>Загрузка...</>
        );
    }
    return (
        <>
            <table>
                <thead style={{"position": "sticky", "top": "10px", "background": "gray"}}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <>
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <th key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </th>
                                ))}
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </>
    );
};