import React from "react";
import { Table } from "@tanstack/react-table";

type RowType = Record<string, any>;

interface IPropsTable {
    table: Table<RowType>,
    columns: Array<{
        accessorKey: string,
        header: string,
        cell: void
    }>
}

export const AppTable: React.FC<IPropsTable> = ({table}) => {
    return (
        <></>
    );
};