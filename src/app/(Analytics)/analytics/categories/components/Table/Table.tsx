import React, { useEffect, useState } from "react";
import { ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from "@tanstack/react-table";
import { Categories } from "../../types";
import { getAuth } from "@firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import moment from "moment";
import { updateSubRows } from "../../utils/updateSubRows";
import { Loader } from "@gravity-ui/uikit";

type ITable = {
    market: string;
    period: number;
    sorting: string;
}

export const Table = ({market, period, sorting}: ITable ) => {
    const auth = getAuth(firebase_app) as any;

    const [data, setData] = useState<Categories[]>([]);
    const [expanded, setExpanded] = useState<ExpandedState>({});
    const [loader, setLoader] = useState(false);

    const sort = `&sort=${sorting}`;

    useEffect(() => {
        const getCategories = async () => {
            const url = "https://api.marketdb.pro/gateway/external-analytics/categories";
            const q = `?mp=${market}&startDate=${moment().subtract(period, "days").format("YYYY-MM-DD")}&endDate=${moment().format("YYYY-MM-DD")}`;
            const response = await fetch(url + q + sort, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${auth.currentUser.accessToken}`,
                    "X-Request-ID": "428dc70a-373d-41a8-a9a8-9fa2a16e405d"
                }
            });
            const data = await response.json();
            const newDate = data.map((item: any) => {
                return {
                    id: item.category.id,
                    name: item.category.name,
                    mp: item.category.mp,
                    childrens: item.category.childrens,
                    analytics: item.analytics
                };
            });

            setData(newDate);
            setTimeout(() => {
                setLoader(false);
            }, 3000);
        };
        setLoader(true);
        getCategories();
    }, [market, period, sorting]);

    const columns = [
        {
            accessorKey: "name",
            header: "Категория",
            cell: ({ row, getValue}: any) => {

                const toggleRowExpansion = (rowId: string) => {
                    setExpanded((oldExpanded: any) => {
                        const isExpanded = oldExpanded[rowId];
                        return {
                            ...oldExpanded,
                            [rowId]: !isExpanded,
                        };
                    });
                };

                const getChildrensRows = async (row: any) => {
                    if(!row.original.subRows) {
                        const url = "https://api.marketdb.pro/gateway/external-analytics/categories";
                        const q = `?mp=KE&startDate=2024-02-10&endDate=2024-03-10&id=${row.original.id}`;
                        const response = await fetch(url + q + sort, {
                            method: "GET",
                            headers: {
                                "Authorization": `Bearer ${auth.currentUser.accessToken}`,
                                "X-Request-ID": "428dc70a-373d-41a8-a9a8-9fa2a16e405d"
                            }
                        });
                        
                        const responseData = await response.json();

                        const tableArray = responseData.map((item: any) => {
                            return {
                                id: item.category.id,
                                name: item.category.name,
                                mp: item.category.mp,
                                childrens: item.category.childrens,
                                analytics: item.analytics
                            };
                        });
        
                        let categoryUpdated = false;
                        for (let i = 0; i < data.length; i++) {
                            if (updateSubRows([data[i]], row.original.id, tableArray)) {
                                categoryUpdated = true;
                                break;
                            }
                        }

                        if (categoryUpdated) {
                            setData([...data]);
                        } else {
                            console.log("Категория не найдена");
                        }
                    }
                    toggleRowExpansion(row.id);
                    // row.toggleExpanded();
                };
                
                return (
                    <div style={{paddingLeft: `${row.depth * 2}rem`}} >
                        <>
                            {row.original.childrens.length !== 0 && (
                                <button
                                    {...{
                                        onClick: () => getChildrensRows(row),
                                        style: { cursor: "pointer" },
                                    }}
                                >
                                    {row.getIsExpanded() ? "👇" : "👉"}
                                </button>
                            )}
                            {getValue()}
                        </>
                    </div>
                );
            },
        },
        {
            accessorKey: "mp",
            header: "Маркетплейс",
        },
        {
            accessorKey: "analytics.revenue",
            header: "Выручка",
        },
        {
            accessorKey: "analytics.revenue_per_product",
            header: "Выручка на продукт",
        },
        {
            accessorKey: "analytics.order_amount",
            header: "Продаж, шт",
        },
        {
            accessorKey: "analytics.order_per_product",
            header: "Продаж на товар",
        },
        {
            accessorKey: "analytics.product_count",
            header: "Товаров всего",
        },
        {
            accessorKey: "analytics.seller_count",
            header: "Продавцов",
        },
        {
            accessorKey: "analytics.order_per_seller",
            header: "Продаж на продавца",
        },
        {
            accessorKey: "analytics.average_bill",
            header: "Средний чек",
        },
    ];

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded
        },
        onExpandedChange: setExpanded,
        getSubRows: row => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        debugTable: true,
        manualExpanding: true,
    });


    if(loader) {
        return (
            <div className='loader-div'>
                <Loader size="m"/>
            </div>
        );
    }
    return (
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
                        {row.getIsExpanded() &&  (
                            <>
                                {row.subRows.map(rows => (
                                    <React.Fragment key={rows.id}>
                                        <tr>
                                            {rows.getVisibleCells().map(cell => (
                                                <th key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </th>
                                            ))}
                                        </tr>
                                        {/* Рекурсивно отображаем подкатегории */}
                                        {rows.subRows && rows.subRows.length > 0 && (
                                            rows.subRows.map(subRow => (
                                                rows.getIsExpanded() && (
                                                <React.Fragment key={subRow.id}>
                                                    <tr>
                                                        {subRow.getVisibleCells().map(cell => (
                                                            <th key={cell.id}>
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                                
                                                            </th>
                                                        ))}
                                                    </tr>
                                                    {/* Продолжаем рекурсивно отображать подкатегории, если они есть */}
                                                    {subRow.subRows && subRow.subRows.length > 0 && (
                                                        subRow.subRows.map(innerSubRow => (
                                                            subRow.getIsExpanded() && (
                                                                <tr key={innerSubRow.id}>
                                                                    {innerSubRow.getVisibleCells().map(cell => (
                                                                        <th key={cell.id}>
                                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                                            
                                                                        </th>
                                                                    ))}
                                                                </tr>
                                                            )
                                                        ))
                                                    )}
                                                </React.Fragment>
                                                )
                                            ))
                                        )}
                                    </React.Fragment>
                                ))}
                            </>
                        )}
                    </>
                ))}
            </tbody>
        </table>
    );
};