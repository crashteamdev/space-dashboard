import React from "react";
import { useWindowScroll } from "@uidotdev/usehooks";
import clsx from "clsx";
import { ArrowUpIcon } from "@heroicons/react/20/solid";

export const AppScroll = () => {
    const [{ y }, scrollTo] = useWindowScroll();
    return (
        <button 
            className={clsx("transition-all w-10 h-10 rounded-full border fixed bottom-[20px] right-[20px] z-[9999px] bg-[#3e4784]" , {
                "flex justify-center items-center": y! > 200,
                "hidden": y! < 200,
            })}
            onClick={() => scrollTo({ left: 0, top: 0, behavior: "smooth" })}
        >
            <ArrowUpIcon width={20} height={20} fill="white" />
        </button>
    );
};