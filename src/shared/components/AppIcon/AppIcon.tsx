import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import { IconType } from "./types";

const LavaPay = dynamic(() => import("./components/LavaPay").then((module) => module.LavaPay), {ssr: false});
const Freekassa = dynamic(() => import("./components/Freekassa").then((module) => module.Freekassa), {ssr: false});
const ClickUp = dynamic(() => import("./components/ClickUp").then((module) => module.ClickUp), {ssr: false});
const Logo = dynamic(() => import("./components/Logo").then((module) => module.Logo), {ssr: true});
const Enot = dynamic(() => import("./components/Enot").then((module) => module.Enot), {ssr: true});
const Filter = dynamic(() => import("./components/Filter").then((module) => module.Filter), {ssr: true});
const ArrowTopRightOnSquare = dynamic(() => import("./components/ArrowTopRightOnSquare").then((module) => module.ArrowTopRightOnSquare), {ssr: true});
const ArrowIcon = dynamic(() => import("./components/ArrowIcon").then((module) => module.ArrowIcon), {ssr: true});
const MinusIcon = dynamic(() => import("./components/MinusIcon").then((module) => module.MinusIcon), {ssr: true});
const PlusIcon = dynamic(() => import("./components/PlusIcon").then((module) => module.PlusIcon), {ssr: true});
const TelegramIcon = dynamic(() => import("./components/Telegram").then((module) => module.TelegramIcon), {ssr: true});
const QuestionsIcon = dynamic(() => import("./components/Questions").then((module) => module.QuestionsIcon), {ssr: true});
const SearchIcon = dynamic(() => import("./components/Search").then((module) => module.SearchIcon), {ssr: true});


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
    "arrowTopRightOnSquare": (className, color) => <ArrowTopRightOnSquare className={className} color={color} />,
    "arrowIcon": (className, color) => <ArrowIcon className={className} color={color} />,
    "minusIcon": (className, color) => <MinusIcon className={className} color={color} />,
    "plusIcon": (className, color) => <PlusIcon className={className} color={color} />,
    "telegram": (className, color) => <TelegramIcon className={className} color={color}/>,
    "questions": (className) => <QuestionsIcon className={className} />,
    "search": (className) => <SearchIcon className={className} />,
};


export const AppIcon: React.FC<Props> = ({ type, className = "", color = "" }) => {
    return <>{icons[type](className, color)}</>;
};