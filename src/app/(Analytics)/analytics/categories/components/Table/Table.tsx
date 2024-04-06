import React, { HTMLAttributes, useEffect, useState } from "react";
import { ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from "@tanstack/react-table";
import { Categories } from "../../types";
import { getAuth } from "@firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { updateSubRows } from "../../utils/updateSubRows";
import Link from "next/link";
import { AppButton } from "@/shared/components/AppButton";
import clsx from "clsx";
import { Skeleton } from "@mui/material";

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
    const [loaderSubRows, setLoaderSubRows] = useState({load: false, rowId: null});

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
                    analytics: item.analytics,
                    difference_percent: item.difference_percent,
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
                    setTimeout(() => {
                        setExpanded((oldExpanded: any) => {
                            const isExpanded = oldExpanded[rowId];
                            return {
                                ...oldExpanded,
                                [rowId]: !isExpanded,
                            };
                        });
                    }, 5000);
                };

                const getChildrensRows = async (row: any) => {
                    if(!row.original.subRows) {
                        setLoaderSubRows({
                            load: true,
                            rowId: row.id
                        });
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
                                analytics: item.analytics,
                                difference_percent: item.difference_percent,
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
                            setLoaderSubRows({
                                load: false,
                                rowId: null
                            });
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
            cell: ({ row, getValue}: any) => {
                return (
                    <div className="relative">
                        <div>{getValue()}</div>
                        <div className={clsx("text-[9px] leading-[10px]", {
                            "text-[red]": row.original.difference_percent.revenue < 0,
                            "text-[green]": row.original.difference_percent.revenue > 0,
                            "text-[gray]": row.original.difference_percent.revenue === 0,
                        })}>{row.original.difference_percent.revenue}%</div>
                    </div>
                );
            }
        },
        {
            accessorKey: "analytics.revenue_per_product",
            header: "Выручка на продукт",
            cell: ({ row, getValue}: any) => {
                return (
                    <div className="relative">
                        <div>{getValue()}</div>
                        <div className={clsx("text-[9px] leading-[10px]", {
                            "text-[red]": row.original.difference_percent.revenue_per_product < 0,
                            "text-[green]": row.original.difference_percent.revenue_per_product > 0,
                            "text-[gray]": row.original.difference_percent.revenue_per_product === 0,
                        })}>{row.original.difference_percent.revenue_per_product}%</div>
                    </div>
                );
            }
        },
        {
            accessorKey: "analytics.order_amount",
            header: "Продаж, шт",
            cell: ({ row, getValue}: any) => {
                return (
                    <div className="relative">
                        <div>{getValue()}</div>
                        <div className={clsx("text-[9px] leading-[10px]", {
                            "text-[red]": row.original.difference_percent.order_amount < 0,
                            "text-[green]": row.original.difference_percent.order_amount > 0,
                            "text-[gray]": row.original.difference_percent.order_amount === 0,
                        })}>{row.original.difference_percent.order_amount}%</div>
                    </div>
                );
            }
        },
        {
            accessorKey: "analytics.order_per_product",
            header: "Продаж на товар",
            cell: ({ row, getValue}: any) => {
                return (
                    <div className="relative">
                        <div>{getValue()}</div>
                        <div className={clsx("text-[9px] leading-[10px]", {
                            "text-[red]": row.original.difference_percent.order_per_product < 0,
                            "text-[green]": row.original.difference_percent.order_per_product > 0,
                            "text-[gray]": row.original.difference_percent.order_per_product === 0,
                        })}>{row.original.difference_percent.order_per_product}%</div>
                    </div>
                );
            }
        },
        {
            accessorKey: "analytics.product_count",
            header: "Товаров всего",
            cell: ({ row, getValue}: any) => {
                return (
                    <div className="relative">
                        <div>{getValue()}</div>
                        <div className={clsx("text-[9px] leading-[10px]", {
                            "text-[red]": row.original.difference_percent.product_count < 0,
                            "text-[green]": row.original.difference_percent.product_count > 0,
                            "text-[gray]": row.original.difference_percent.product_count === 0,
                        })}>{row.original.difference_percent.product_count}%</div>
                    </div>
                );
            }
        },
        {
            accessorKey: "analytics.seller_count",
            header: "Продавцов",
            cell: ({ row, getValue}: any) => {
                return (
                    <div className="relative">
                        <div>{getValue()}</div>
                        <div className={clsx("text-[9px] leading-[10px]", {
                            "text-[red]": row.original.difference_percent.seller_count < 0,
                            "text-[green]": row.original.difference_percent.seller_count > 0,
                            "text-[gray]": row.original.difference_percent.seller_count === 0,
                        })}>{row.original.difference_percent.seller_count}%</div>
                    </div>
                );
            }
        },
        {
            accessorKey: "analytics.order_per_seller",
            header: "Продаж на продавца",
            cell: ({ row, getValue}: any) => {
                return (
                    <div>
                        <div>{getValue()}</div>
                        <div className={clsx("text-[9px] leading-[10px]", {
                            "text-[red]": row.original.difference_percent.order_per_seller < 0,
                            "text-[green]": row.original.difference_percent.order_per_seller > 0,
                            "text-[gray]": row.original.difference_percent.order_per_seller === 0,
                        })}>{row.original.difference_percent.order_per_seller}%</div>
                    </div>
                );
            }
        },
        {
            accessorKey: "analytics.average_bill",
            header: "Средний чек",
            cell: ({ row, getValue}: any) => {
                return (
                    <div>
                        <div>{getValue()}</div>
                        <div className={clsx("text-[9px] leading-[10px]", {
                            "text-[red]": row.original.difference_percent.average_bill < 0,
                            "text-[green]": row.original.difference_percent.average_bill > 0,
                            "text-[gray]": row.original.difference_percent.average_bill === 0,
                        })}>{row.original.difference_percent.average_bill}%</div>
                    </div>
                );
            }
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

    useEffect(() => {
        console.log(expanded);
    }, [expanded]);

    return (
        <table {...props} className="mdb-table">
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
                {loader ? (
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
                                {row.getVisibleCells().map(cell => (
                                    <th key={cell.id} className={`md-th-${cell.id}`}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </th>
                                ))}
                            </tr>
                            {row.getIsExpanded() && (
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
                </>
                }
            </tbody>
        </table>
    );
};