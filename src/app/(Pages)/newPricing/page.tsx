"use client";

import PageContainer from "@/components/ui/container/PageContainer";
import { AppAccordionGroup } from "@/shared/components/AppAccordionGroup";
import { AppButton } from "@/shared/components/AppButton";
import React from "react";
import { formattedAccordion } from "./statics";
import { RadioButton } from "@/shared/components/AppRadioButton";
import { useCart } from "@/shared/hooks/useCart";

interface Discount {
    "1": number;
    "3": number;
    "6": number;
}

interface Tariff {
    id: number;
    name: string;
    price: string;
    discounts: Discount;
    parentId?: number; 
}

interface AccordionItem {
    id: number;
    name: string;
    tariffs: Tariff[];
}

const NewPricing = () => {
    const {
        selectedTariffs,
        selectedPeriod,
        handleTariffChange,
        handleTariffRemove,
        handlePeriodChange,
        getTotalPrice
    } = useCart();

    return (
        <PageContainer title="Тарифы" description="Тарифы">
            <div className="flex flex-col gap-3 mt-[30px]">
                <div className="font-bold text-[26px] text-[#000]">Корзина тарифов</div>
                
            </div>
            <div className="flex gap-2.5 months mt-3">
                <RadioButton
                    name="period"
                    value="1"
                    checked={selectedPeriod === 1}
                    onChange={() => handlePeriodChange(1)}
                >
                    1 месяц
                </RadioButton>
                <RadioButton
                    name="period"
                    value="3"
                    checked={selectedPeriod === 3}
                    onChange={() => handlePeriodChange(3)}
                >
                    3 месяца
                </RadioButton>
                <RadioButton
                    name="period"
                    value="6"
                    checked={selectedPeriod === 6}
                    onChange={() => handlePeriodChange(6)}
                >
                    6 месяцев
                </RadioButton>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-[40px]">
                <div className="col-span-9">
                    <AppAccordionGroup
                        items={formattedAccordion as AccordionItem[]}
                        isFirstOpen={false}
                        accordionContentSlot={(item: AccordionItem) => (
                            <div>
                                {item.tariffs && item.tariffs.map((tariff, index) => (
                                    <div key={index} className="flex items-center">
                                        <RadioButton
                                            name={`tariff-${item.id}`}
                                            value={tariff.name}
                                            checked={selectedTariffs.some(t => t.id === tariff.id && t.parentId === item.id)}
                                            onChange={() => handleTariffChange({ ...tariff, parentId: item.id })}
                                        >
                                            {tariff.name}: {tariff.price}
                                        </RadioButton>
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                </div>
                <div className="col-span-3">
                    <div className="bg-[#fff] pt-[20px] pb-[15px] rounded-lg shadow-[unset]">
                        <div className="font-bold text-[22px] px-[15px]">Корзина</div>
                        <ul className="px-[15px] pt-[15px] flex flex-col gap-2.5">
                            {selectedTariffs.map((tariff: any, index: any) => (
                                <li className="text-sm font-medium" key={index}>
                                    {tariff.nameInCart}: {tariff.price} $/мес.
                                    <button
                                            onClick={() => handleTariffRemove(tariff.id)}
                                        className="ml-4 p-2 bg-red-500 text-black rounded"
                                    >
                                        Удалить
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <hr className="bg-[#efefef] my-[15px] h-[1px] border-none" />
                        <div className="px-[15px] ">
                            <div className="text-[14px] font-semibold mb-1">Промокод ( если есть ):</div>
                            <input placeholder="Промокод" className="border border-blueGray-100 px-2 py-1 w-full" />
                        </div>
                        <hr className="bg-[#efefef] my-[15px] h-[1px] border-none" />
                        <div className="flex flex-col px-[15px]">
                            <div className="font-semibold text-[16px] mb-[10px]">Итого:</div>
                            <div className="font-semibold text-[24px] mb-[20px]">{getTotalPrice()} $/мес.</div>
                            <AppButton tag="a" href="/" className="flex justify-center font-bold">Купить</AppButton>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default NewPricing;
