import React, { HTMLAttributes, useEffect, useState } from "react";
import { ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from "@tanstack/react-table";
import { Categories } from "../../types";
import { getAuth } from "@firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { updateSubRows } from "../../utils/updateSubRows";
import Link from "next/link";
import { AppButton } from "@/shared/components/AppButton";

type ITable = {
    market: string;
    period: string;
    sorting: string;
} & HTMLAttributes<HTMLTableElement>;

export const Table = ({market, period, sorting, ...props}: ITable ) => {
    const urlCategoriesStats = "https://api.marketdb.pro/gateway/external-analytics/categories/stats";
    const query = `?mp=${market}&period=${period}`;
    const sort = sorting && `&sort=${sorting}`;

    const auth = getAuth(firebase_app) as any;
    
    const headers = {
        "Authorization": `Bearer ${auth.currentUser.accessToken}`,
        "X-Request-ID": uuidv4()
    };

    const [data, setData] = useState<Categories[]>([]);
    const [expanded, setExpanded] = useState<ExpandedState>({});
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch(urlCategoriesStats + query + sort, {
                method: "GET",
                headers: headers
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
            }, 2000);
        };
        setLoader(true);
        getCategories();
    }, [market, period, sorting]);

    const columns = [
        {
            accessorKey: "name",
            header: "Категория",
            cell: ({ row, getValue}: any) => {
                // console.log(row);
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
                        const response = await fetch(urlCategoriesStats + query + `&id=${row.original.id}` + sort, {
                            method: "GET",
                            headers: headers
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
                    <div className="flex gap-2 items-center" style={{paddingLeft: `${row.depth * 2}rem`}} >
                        <>
                            {row.original.childrens.length !== 0 && (
                                <AppButton
                                    tag="button"
                                    className="mdb-table-block-button"
                                    {...{
                                        onClick: () => getChildrensRows(row),
                                        style: { cursor: "pointer" },
                                    }}
                                >
                                    {row.getIsExpanded() ? "-" : "+"}
                                </AppButton>
                            )}
                            <Link className="mdb-table-link" href={`/analytics/categories/${row.original.id}`}>
                                {getValue()}
                            </Link>
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
                Загрузка...
            </div>
        );
    }
    return (
        <table {...props} className="mdb-table">
            <thead className="mdb-table-thead">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th className="p-2" key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className="mdb-table-tbody">
                {table.getRowModel().rows.map(row => (
                    <>
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <th key={cell.id} className={`md-th-${cell.id}`}>
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
                                                <th key={cell.id} className={`md-th-${cell.id}`}>
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
                                                            <th key={cell.id} className={`md-th-${cell.id}`}>
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
                                                                        <th key={cell.id} className={`md-th-${cell.id}`}>
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