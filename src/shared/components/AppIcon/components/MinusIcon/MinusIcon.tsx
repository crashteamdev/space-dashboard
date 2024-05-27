import React from "react";

type IProps = {
    className?: string;
    color?: string;
}

export const MinusIcon = ({className, color = "#061C3D"}:IProps) => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 12H20.25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};