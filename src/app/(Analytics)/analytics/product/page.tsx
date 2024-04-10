import React from "react";

export default function Product({ params }: { params: { categoryId: string } }) {
    return (
        <>{params.categoryId}</>
    );
};