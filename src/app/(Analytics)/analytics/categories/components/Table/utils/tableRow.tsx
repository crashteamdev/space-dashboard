import React from "react";
import { flexRender } from "@tanstack/react-table";

const TableRow = ({ row, loaderSubRows, loadingSkeleton, isExpanded }: any) => {
    return (
        <>
            <tr key={row.id}>
                {row.getVisibleCells().map((cell: any) => (
                    <th key={cell.id} className={`md-th-${cell.id}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </th>
                ))}
            </tr>
            {loaderSubRows.rowId === row.id && loadingSkeleton(row)}
            {isExpanded && row.subRows.map((subRow: any) => (
                <TableRow 
                    key={subRow.id}
                    row={subRow} 
                    loaderSubRows={loaderSubRows} 
                    loadingSkeleton={loadingSkeleton} 
                    isExpanded={subRow.getIsExpanded()} 
                />
            ))}
        </>
    );
};

export const TableBody = ({ rows, loader, loadingSkeleton, loaderSubRows }: any) => {
    if (loader) {
        return loadingSkeleton();
    }

    return (
        <>
            {rows.map((row: any) => (
                <TableRow 
                    key={row.id} 
                    row={row} 
                    loaderSubRows={loaderSubRows} 
                    loadingSkeleton={loadingSkeleton} 
                    isExpanded={row.getIsExpanded()} 
                />
            ))}
        </>
    );
};