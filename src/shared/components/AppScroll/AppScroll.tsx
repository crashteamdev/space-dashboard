import React from "react";
import { useWindowScroll } from "@uidotdev/usehooks";
import clsx from "clsx";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

const scrollButtonVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        transition: {
            opacity: { duration: 0.3 },
            y: { duration: 0.3 }
        }
    },
    visible: {
        opacity: 1,
        y: -40,
        transition: {
            opacity: { duration: 0.3 },
            y: { duration: 0.3 }
        }
    }
  };

export const AppScroll = () => {
    const [{ y }, scrollTo] = useWindowScroll();
    return (
        <motion.button 
            variants={scrollButtonVariants}
            initial="hidden"
            animate={y! > 200 ? "visible" : "hidden"}
            className={clsx("flex transition-all w-10 h-10 rounded-full border bg-[#3e4784] justify-center items-center fixed bottom-[-20px] right-[20px] z-[9999px]")}
            onClick={() => scrollTo({ left: 0, top: 0, behavior: "smooth" })}
        >
            <ArrowUpIcon width={20} height={20} fill="white" />
        </motion.button>
    );
};