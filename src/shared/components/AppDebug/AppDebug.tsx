import React from "react";

type Props = {
    value?: object;
};
export const AppDebug = ({ value }: Props) => {
    return <pre className={"text-sm"}>{JSON.stringify(value, null, 2)}</pre>;
};
