import Image from "next/image";
import Link from "next/link";
import React from "react";

export const AppTelegramWidget = () => {
    return (
        <Link href="https://t.me/marketdbru" className="flex gap-3 bg-white rounded-lg m-6 p-2">
            <div className="w-8 h-8 rounded-full overflow-hidden relative">
                <Image 
                    src="/chat-avatar.jpg"
                    alt="Аватарка чата"
                    fill
                />
            </div>
            <div className="flex flex-col gap">
                <div className="text-base text-black-800 font-semibold">Telegram</div>
                <div className="text-xs text-gray font-medium text-[#a7a7a7]">1000 подписчиков</div>
            </div>
        </Link>
    );
};