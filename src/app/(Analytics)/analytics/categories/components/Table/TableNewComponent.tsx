/* ОПИСАНИЕ:
Перевел самый первый запрос на useQuery, второй запрос не успел и не совсем понятно что делать с data, 
так как надо по факту либо его либо новый useState делать чтоб его заполнять

лагает вызов table.getRowModal.rows
*/




// import React, { HTMLAttributes, useState } from "react";
// import { ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from "@tanstack/react-table";
// import { Categories } from "../../types";
// import { v4 as uuidv4 } from "uuid";
// import { updateSubRows } from "../../utils/updateSubRows";
// import Link from "next/link";
// import { AppButton } from "@/shared/components/AppButton";
// import clsx from "clsx";
// import { Skeleton } from "@mui/material";
// import { formatNumber } from "@/hooks/useFormatNumber";
// import { TableBody } from "./utils/tableRow";
// import { useLocalStorage, useWindowScroll } from "@uidotdev/usehooks";
// import Image from "next/image";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import firebase_app from "@/shared/firebase/firebase";
// import { getAuth } from "firebase/auth";
// import { marketplace } from "../../statics";

// type ITable = {
//     sorting: string;
// } & HTMLAttributes<HTMLTableElement>;

// export const Table = ({sorting, ...props}: ITable ) => {
//     const [periodDay, setPeriodDay] = useLocalStorage("period", "WEEK");
//     const [market, setMarket] = useLocalStorage("market", marketplace[1]);
//     // const auth = getAuth(firebase_app) as any;
//     // const [{ y }] = useWindowScroll();
//     // const [expanded, setExpanded] = useState<ExpandedState>({});
//     // const [loaderSubRows, setLoaderSubRows] = useState({load: false, rowId: null});

//     // const headers = {
//     //     "Authorization": `Bearer ${auth.currentUser.accessToken}`,
//     //     "X-Request-ID": uuidv4()
//     // };

//     // const getCategoriesStats = async (market: string, period: string, sorting: string): Promise<any> => {
//     //     const url = `https://api.marketdb.pro/gateway/external-analytics/categories/stats?mp=${market}&period=${period}&sort=${sorting}`;
//     //     try {
//     //         const response = await axios.get<Categories[]>(url, {
//     //             headers: headers
//     //         });
//     //         return response.data;
//     //     } catch (error) {
//     //         throw new Error("Failed to fetch product stats");
//     //     }
//     // };

//     // const { isLoading, isSuccess, data: dataNew } = useQuery({
//     //     queryKey: ["catStats", period, market, sorting], 
//     //     queryFn: () => getCategoriesStats(market, period, sorting),
//     //     staleTime: 1000 * 60 * 10
//     // });

//     const columns = [
//         {
//             accessorKey: "category.name",
//             header: "Категория",
//             cell: ({ row, getValue}: any) => {
//                 // const toggleRowExpansion = (rowId: string) => {
//                 //     setTimeout(() => {
//                 //         setLoaderSubRows({load: false, rowId: null});
//                 //         setExpanded((oldExpanded: any) => {
//                 //             const isExpanded = oldExpanded[rowId];
//                 //             return {
//                 //                 ...oldExpanded,
//                 //                 [rowId]: !isExpanded,
//                 //             };
//                 //         });
//                 //     }, 500);
//                 // };

//                 // const getChildrensRows = async (row: any) => {
//                 //     if(!row.original.subRows) {
//                 //         setLoaderSubRows({load: true, rowId: row.id});
                        
//                 //         const response = await fetch(`https://api.marketdb.pro/gateway/external-analytics/categories/stats?mp=${market}&period=${period}&id=${row.original.category.id}&sort=${sorting}`, {
//                 //             method: "GET",
//                 //             headers: headers
//                 //         });
                        
//                 //         const responseData = await response.json();
//                 //         console.log(responseData);
//                 //         // const tableArray = responseData.map((item: any) => {
//                 //         //     return {
//                 //         //         id: item.category.id,
//                 //         //         name: item.category.name,
//                 //         //         mp: item.category.mp,
//                 //         //         childrens: item.category.childrens,
//                 //         //         analytics: item.analytics,
//                 //         //         difference_percent: item.difference_percent,
//                 //         //     };
//                 //         // });
        
//                 //         // let categoryUpdated = false;
//                 //         // for (let i = 0; i < .length; i++) {
//                 //         //     if (updateSubRows([newData[i]], row.original.id, tableArray)) {
//                 //         //         categoryUpdated = true;
//                 //         //         break;
//                 //         //     }
//                 //         // }

//                 //         // if (categoryUpdated) {
//                 //         //     setData([...data]);
//                 //         // } else {
//                 //         //     console.log("Категория не найдена");
//                 //         // }
//                 //     }
//                 //     toggleRowExpansion(row.id);
//                 // };

//                 return (
//                     <div className="flex gap-2 items-center" style={{paddingLeft: `${row.depth * 2}rem`}} >
//                         <>
//                             {/* {row.original.category.childrens.length !== 0 && (
//                                 <AppButton
//                                     tag="button"
//                                     className="mdb-table-block-button"
//                                     {...{
//                                         onClick: () => getChildrensRows(row),
//                                         style: { cursor: "pointer" },
//                                     }}
//                                 >
//                                     {row.getIsExpanded() ? "-" : "+"}
//                                 </AppButton>
//                             )} */}
//                             <Link className="mdb-table-link" href={`/analytics/categories/${row.original.id}`}>
//                                 {getValue()}
//                             </Link>
//                         </>
//                     </div>
//                 );
//             },
//         },
//         {
//             accessorKey: "category.mp",
//             header: "Маркетплейс",
//             cell: ({ getValue }: any) => {
//                 return (
//                     <div className="relative">
//                         {getValue() === "KE" 
//                             ? <Image src="/mm.png" alt="Магнит Маркет" width={20} height={20} /> 
//                             : <Image src="/uzum.svg" alt="Магнит Маркет" width={20} height={20} /> 
//                         }
//                     </div>
//                 );
//             }
//         },
//         {
//             accessorKey: "analytics.revenue",
//             id: "analytics.revenue",
//             header: "Выручка",
//             cell: ({ row, getValue}: any) => {
//                 return (
//                     <div className="relative">
//                         <div>{formatNumber(getValue())}</div>
//                         <div className={clsx("text-[9px] leading-[10px]", {
//                             "text-[red]": row.original.difference_percent.revenue < 0,
//                             "text-[green]": row.original.difference_percent.revenue > 0,
//                             "text-[gray]": row.original.difference_percent.revenue === 0,
//                         })}>{row.original.difference_percent.revenue}%</div>
//                     </div>
//                 );
//             }
//         },
//         {
//             accessorKey: "analytics.revenue_per_product",
//             header: "Выручка на продукт",
//             cell: ({ row, getValue}: any) => {
//                 return (
//                     <div className="relative">
//                         <div>{formatNumber(getValue())}</div>
//                         <div className={clsx("text-[9px] leading-[10px]", {
//                             "text-[red]": row.original.difference_percent.revenue_per_product < 0,
//                             "text-[green]": row.original.difference_percent.revenue_per_product > 0,
//                             "text-[gray]": row.original.difference_percent.revenue_per_product === 0,
//                         })}>{row.original.difference_percent.revenue_per_product}%</div>
//                     </div>
//                 );
//             }
//         },
//         {
//             accessorKey: "analytics.order_amount",
//             header: "Продаж, шт",
//             cell: ({ row, getValue}: any) => {
//                 return (
//                     <div className="relative">
//                         <div>{formatNumber(getValue())}</div>
//                         <div className={clsx("text-[9px] leading-[10px]", {
//                             "text-[red]": row.original.difference_percent.order_amount < 0,
//                             "text-[green]": row.original.difference_percent.order_amount > 0,
//                             "text-[gray]": row.original.difference_percent.order_amount === 0,
//                         })}>{row.original.difference_percent.order_amount}%</div>
//                     </div>
//                 );
//             }
//         },
//         {
//             accessorKey: "analytics.order_per_product",
//             header: "Продаж на товар",
//             cell: ({ row, getValue}: any) => {
//                 return (
//                     <div className="relative">
//                         <div>{getValue()}</div>
//                         <div className={clsx("text-[9px] leading-[10px]", {
//                             "text-[red]": row.original.difference_percent.order_per_product < 0,
//                             "text-[green]": row.original.difference_percent.order_per_product > 0,
//                             "text-[gray]": row.original.difference_percent.order_per_product === 0,
//                         })}>{row.original.difference_percent.order_per_product}%</div>
//                     </div>
//                 );
//             }
//         },
//         {
//             accessorKey: "analytics.product_count",
//             header: "Товаров всего",
//             cell: ({ row, getValue}: any) => {
//                 return (
//                     <div className="relative">
//                         <div>{formatNumber(getValue())}</div>
//                         <div className={clsx("text-[9px] leading-[10px]", {
//                             "text-[red]": row.original.difference_percent.product_count < 0,
//                             "text-[green]": row.original.difference_percent.product_count > 0,
//                             "text-[gray]": row.original.difference_percent.product_count === 0,
//                         })}>{row.original.difference_percent.product_count}%</div>
//                     </div>
//                 );
//             }
//         },
//         {
//             accessorKey: "analytics.seller_count",
//             header: "Продавцов",
//             cell: ({ row, getValue}: any) => {
//                 return (
//                     <div className="relative">
//                         <div>{formatNumber(getValue())}</div>
//                         <div className={clsx("text-[9px] leading-[10px]", {
//                             "text-[red]": row.original.difference_percent.seller_count < 0,
//                             "text-[green]": row.original.difference_percent.seller_count > 0,
//                             "text-[gray]": row.original.difference_percent.seller_count === 0,
//                         })}>{row.original.difference_percent.seller_count}%</div>
//                     </div>
//                 );
//             }
//         },
//         {
//             accessorKey: "analytics.order_per_seller",
//             header: "Продаж на продавца",
//             cell: ({ row, getValue}: any) => {
//                 return (
//                     <div>
//                         <div>{formatNumber(getValue())}</div>
//                         <div className={clsx("text-[9px] leading-[10px]", {
//                             "text-[red]": row.original.difference_percent.order_per_seller < 0,
//                             "text-[green]": row.original.difference_percent.order_per_seller > 0,
//                             "text-[gray]": row.original.difference_percent.order_per_seller === 0,
//                         })}>{row.original.difference_percent.order_per_seller}%</div>
//                     </div>
//                 );
//             }
//         },
//         {
//             accessorKey: "analytics.average_bill",
//             header: "Средний чек",
//             cell: ({ row, getValue}: any) => {
//                 return (
//                     <div>
//                         <div>{formatNumber(getValue())}</div>
//                         <div className={clsx("text-[9px] leading-[10px]", {
//                             "text-[red]": row.original.difference_percent.average_bill < 0,
//                             "text-[green]": row.original.difference_percent.average_bill > 0,
//                             "text-[gray]": row.original.difference_percent.average_bill === 0,
//                         })}>{row.original.difference_percent.average_bill}%</div>
//                     </div>
//                 );
//             }
//         },
//     ];

//     const table = useReactTable({
//         data: [],
//         columns: [],
//         // state: {
//         //     expanded,
//         // },
//         // onExpandedChange: setExpanded,
//         // getSubRows: row => row.subRows,
//         getCoreRowModel: getCoreRowModel(),
//         getExpandedRowModel: getExpandedRowModel(),
//         // manualExpanding: true,
//         // columnResizeMode: "onChange",
//     });

//     // const loadingSkeleton = (children?: any) => {
//     //     return (
//     //         <>
//     //             {children ? (
//     //                 <>
//     //                     {children?.original.category.childrens.map((item: any, key: number) => (
//     //                         <tr key={key}>
//     //                             {columns.map((item, key) => (
//     //                                 <th key={key}>
//     //                                     <Skeleton variant="rectangular" height={20} />
//     //                                 </th>
//     //                             ))}
//     //                         </tr>
//     //                     ))}
//     //                 </>
//     //             ) : (
//     //                 <>
//     //                     {columns.map((item: any, key: number) => (
//     //                         <tr key={key}>
//     //                             {columns.map((item, key) => (
//     //                                 <th key={key}>
//     //                                     <Skeleton variant="rectangular" height={20} />
//     //                                 </th>
//     //                             ))}
//     //                         </tr>
//     //                     ))}
//     //                 </>
//     //             )}
//     //         </>
//     //     );
//     // };
    
//     console.log(table.getRowModel());

//     return (
//         <>helo</>
//         // <table {...props} className="mdb-table">
//         //     <thead 
//         //         className="mdb-table-thead sticky"
//         //         // style={{
//         //         //     boxShadow: y! > 100 ? "rgb(0 0 0 / 19%) 0 3px 10px 0px" : "none"
//         //         // }}
//         //     >
//         //         {table.getHeaderGroups().map(headerGroup => (
//         //             <tr key={headerGroup.id}>
//         //                 {headerGroup.headers.map(header => (
//         //                     <th className="py-2" key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
//         //                 ))}
//         //             </tr>
//         //         ))}
//         //     </thead>
//         //     <tbody className="mdb-table-tbody">
//         //         {/* <TableBody 
//         //             rows={table.getRowModel().rows} 
//         //             loader={!isSuccess} 
//         //             loadingSkeleton={loadingSkeleton} 
//         //             loaderSubRows={loaderSubRows}
//         //         /> */}
//         //     </tbody>
//         // </table>
//     );
// };