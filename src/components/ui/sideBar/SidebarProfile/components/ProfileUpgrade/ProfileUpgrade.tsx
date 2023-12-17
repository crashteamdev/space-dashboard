import Image from "next/image";
import React from "react";

export const ProfileUpgrade = () => {
    return (
        <div className="mb-3 shadow-[0_1.25rem_1.5rem_0_rgba(0,0,0,0.5)]">
            <div className="p-2.5 rounded-xl">
                <div className="flex items-center px-2.5 py-2.5 pb-[18px]">
                    <div className="relative w-10 h-10">
                        <Image
                            src=""
                            alt=""
                            fill
                        />
                        <div className="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 bg-primary-2 rounded-full border-4 border-n-6"></div>
                    </div>
                    <div className="ml-4 mr-4">
                        <div className="base2 font-semibold text-n-1">Tran Mau Tri Tam</div>
                        <div className="caption1 font-semibold text-n-3/50">tam@ui8.net</div>
                    </div>
                    <div className="shrnik-0 ml-auto self-start px-3 bg-primary-2 rounded-lg caption1 font-bold text-n-7">Free</div>
                </div>
                <a className="border boder-[#232627] w-full mt-2" href="/pricing">Обновить тариф</a>
            </div>
        </div>
    );
};