import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import { IconType } from "./types";

const LavaPay = dynamic(() => import("./components/LavaPay").then((module) => module.LavaPay), {
    ssr: false
});

const Freekassa = dynamic(() => import("./components/Freekassa").then((module) => module.Freekassa), {
    ssr: false
});

const ClickUp = dynamic(() => import("./components/ClickUp").then((module) => module.ClickUp), {
    ssr: false
});

const Logo = dynamic(() => import("./components/Logo").then((module) => module.Logo), {
    ssr: true
});

const Enot = dynamic(() => import("./components/Enot").then((module) => module.Enot), {
    ssr: true
});

const Filter = dynamic(() => import("./components/Filter").then((module) => module.Filter), {
    ssr: true
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
    "click-up": (className, color) => <ClickUp className={className} color={color} />,
    "logo": (className, color) => <Logo className={className} color={color} />,
    "enot": (className, color) => <Enot className={className} color={color} />,
    "filter": (className, color) => <Filter className={className} color={color} />,
};


export const AppIcon: React.FC<Props> = ({ type, className = "", color = "" }) => {
    return <>{icons[type](className, color)}</>;
};