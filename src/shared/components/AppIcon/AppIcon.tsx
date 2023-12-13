import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import { IconType } from "./types";

const LavaPay = dynamic(() => import("./components/LavaPay").then((module) => module.LavaPay), {
    ssr: false
});

const Freekassa = dynamic(() => import("./components/Freekassa").then((module) => module.Freekassa), {
    ssr: false
});

type Props = {
    type: IconType;
    className?: string;
    color?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const icons: Record<IconType, (className: string, color: string) => ReactNode> = {
    "lava-pay": (className, color) => <LavaPay className={className} color={color} />,
    "freekassa": (className, color) => <Freekassa className={className} color={color} />,
};


export const AppIcon: React.FC<Props> = ({ type, className = "", color = "" }) => {
    return <>{icons[type](className, color)}</>;
};