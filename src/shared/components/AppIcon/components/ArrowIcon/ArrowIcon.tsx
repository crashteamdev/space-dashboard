import React from "react";

type IProps = {
    className?: string;
    color?: string;
}

export const ArrowIcon = ({ className,  color }: IProps) => {
    return (
        <svg className={className} width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke={color} strokeWidth="1.3" />
        </svg>
    );
};