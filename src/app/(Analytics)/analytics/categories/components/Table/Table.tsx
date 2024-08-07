import React, { HTMLAttributes, useEffect, useState } from "react";
import { ColumnPinningState, ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from "@tanstack/react-table";
import { Categories } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { updateSubRows } from "../../utils/updateSubRows";
import Link from "next/link";
import { AppButton } from "@/shared/components/AppButton";
import clsx from "clsx";
import { Skeleton } from "@mui/material";
import { formatNumber } from "@/hooks/useFormatNumber";
import { TableBody } from "./utils/tableRow";
import Image from "next/image";
import {useFirebaseToken} from "@/hooks/useFirebaseToken";
import axios from "axios";
import { axiosApi } from "@/api/axios/axios";

type ITable = {
    market: string;
    period: string;
    sorting: string;
} & HTMLAttributes<HTMLTableElement>;

interface SubscriptionResponse {
    active: boolean;
    createdAt: string;
    endAt: string;
    type: string;
    typeNumeric: number;
  }

export const Table = ({market, period, sorting, ...props}: ITable ) => {
    const urlCategoriesStats = "https://api.marketdb.pro/gateway/external-analytics/categories/stats";
    const query = `?mp=${market}&period=${period}`;
    const sort = sorting && `&sort=${sorting}`;

    const [data, setData] = useState<Categories[]>([]);
    const [expanded, setExpanded] = useState<ExpandedState>({});
    const [columnPinning] = useState<ColumnPinningState>({
        left: [],
        right: [],
    });
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState<boolean>();
    const [loaderSubRows, setLoaderSubRows] = useState({load: false, rowId: null});
    const token = useFirebaseToken();
    const [active, setActive] = useState<boolean>();
    // const { isAllowed, loading } = useCheckSubscription();

    useEffect(() => {
        const getCategories = async () => {
            // eslint-disable-next-line security/detect-possible-timing-attacks
            if(token === null) {
                return true;
            }

            setError(false);

            const responseSubscribes = await axios.get<SubscriptionResponse>(`https://${market === "KE" ? "ke" : "uzum"}-api.marketdb.pro/v1/user/subscription`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "X-Request-ID": uuidv4()
                }
            });

            if(responseSubscribes.data.active) {
                setActive(true);
                const response = await axiosApi.get(urlCategoriesStats + query + sort);
                if(response.status === 403) {
                    setError(true);
                }
                const data = await response.data;
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
                }, 500);
            } else {
                setActive(false);
            }
        };
        setLoader(true);
        getCategories();
    }, [market, period, sorting, token]);

    const columns = [
        {
            accessorKey: "name",
            header: "Категория",
            cell: ({ row, getValue}: any) => {
                const toggleRowExpansion = (rowId: string) => {
                    setTimeout(() => {
                        setLoaderSubRows({load: false, rowId: null});
                        setExpanded((oldExpanded: any) => {
                            const isExpanded = oldExpanded[rowId];
                            return {
                                ...oldExpanded,
                                [rowId]: !isExpanded,
                            };
                        });
                    }, 500);
                };

                const getChildrensRows = async (row: any) => {
                    if(!row.original.subRows) {
                        setLoaderSubRows({load: true, rowId: row.id});
                        // eslint-disable-next-line security/detect-possible-timing-attacks
                        if(token === null) {
                            return true;
                        }
                        
                        const response = await axiosApi.get(urlCategoriesStats + query + `&id=${row.original.id}` + sort);
                        
                        const responseData = await response.data;

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
            cell: ({ getValue }: any) => {
                return (
                    <div className="relative">
                        {getValue() === "KE" 
                            ? <Image src="/mm.png" alt="Магнит Маркет" width={20} height={20} /> 
                            : <Image src="/uzum.svg" alt="Магнит Маркет" width={20} height={20} /> 
                        }
                    </div>
                );
            }
        },
        {
            accessorKey: "analytics.revenue",
            id: "analytics.revenue",
            header: "Выручка",
            cell: ({ row, getValue}: any) => {
                return (
                    <div className="relative">
                        <div>{formatNumber(getValue())}</div>
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
                        <div>{formatNumber(getValue())}</div>
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
                        <div>{formatNumber(getValue())}</div>
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
                        <div>{formatNumber(getValue())}</div>
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
                        <div>{formatNumber(getValue())}</div>
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
                        <div>{formatNumber(getValue())}</div>
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
                        <div>{formatNumber(getValue())}</div>
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
            expanded,
            columnPinning
        },
        onExpandedChange: setExpanded,
        getSubRows: row => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        manualExpanding: true,
        columnResizeMode: "onChange",
    });

    const loadingSkeleton = (children?: any) => {
        return (
            <>
                {children ? (
                    <>
                        {children?.original.childrens.map((item: any, key: number) => (
                            <tr key={key}>
                                {columns.map((item, key) => (
                                    <th key={key}>
                                        <Skeleton variant="rectangular" height={20} />
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </>
                ) : (
                    <>
                        {columns.map((item: any, key: number) => (
                            <tr key={key}>
                                {columns.map((item, key) => (
                                    <th key={key}>
                                        <Skeleton variant="rectangular" height={20} />
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </>
                )}
            </>
        );
    };

    return (
        <>
            {active ? 
                <table {...props} className="mdb-table">
                    <thead 
                        className="mdb-table-thead sticky"
                        // style={{
                        //     boxShadow: y! > 100 ? "rgb(0 0 0 / 19%) 0 3px 10px 0px" : "none"
                        // }}
                    >
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th className="py-2" key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {error 
                        ? 
                        <tr>
                            <span>У вас нет доступа!</span>
                        </tr>
                        :
                        <tbody className="mdb-table-tbody">
                            <TableBody 
                                rows={table.getRowModel().rows} 
                                loader={loader} 
                                loadingSkeleton={loadingSkeleton} 
                                loaderSubRows={loaderSubRows}
                            />
                        </tbody>
                    }
                </table>
            : 
            <div className="h-full w-full flex items-center justify-center">
                <div className="text-[20px]">
                    У вас отсутствует активный тариф для выбранного маркетплейса!
                    <Link className="block text-blueGray-600 text-center mt-3" href="/pricing">Список тарифов.</Link>
                </div>
            </div>
            }
        </>
    );
};