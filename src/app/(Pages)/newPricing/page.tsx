"use client";

import PageContainer from "@/components/ui/container/PageContainer";
import { AppAccordionGroup } from "@/shared/components/AppAccordionGroup";
import { AppButton } from "@/shared/components/AppButton";
import React, { useState } from "react";
import { formattedAccordion } from "./statics";

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
const RadioButton: React.FC<{
    name: string;
    value: string;
    checked: boolean;
    onChange: () => void;
    children: React.ReactNode;
}> = ({ name, value, checked, onChange, children }) => {
    return (
        <label className="custom-radio">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            <div className={`radio-button ${checked ? "checked" : ""}`} />
            {children}
            <style jsx>{`
                .custom-radio {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    margin-bottom: 10px;
                }
                .radio-button {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #000;
                    border-radius: 50%;
                    margin-right: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s;
                }
                .radio-button.checked {
                    background: #000;
                }
                .radio-button.checked::after {
                    content: '';
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #fff;
                }
                input[type="radio"].hidden {
                    display: none;
                }
            `}</style>
        </label>
    );
};

const NewPricing = () => {
    const [selectedTariffs, setSelectedTariffs] = useState<Tariff[]>([]);
    const [selectedPeriod, setSelectedPeriod] = useState<1 | 3 | 6>(1);

    const handleTariffChange = (tariff: Tariff) => {
        setSelectedTariffs((prevSelected) => {
            const updatedSelection = prevSelected.filter(t => t.parentId !== tariff.parentId);
            return [...updatedSelection, tariff];
        });
    };

    const handleTariffRemove = (tariffId: number) => {
        setSelectedTariffs((prevSelected) => prevSelected.filter(t => t.id !== tariffId));
    };

    const handlePeriodChange = (period: 1 | 3 | 6) => {
        setSelectedPeriod(period);
    };

    const calculateDiscountedPrice = (tariff: Tariff): number => {
        const basePrice = parseInt(tariff.price, 10);
        const discount = tariff.discounts[selectedPeriod];
        return basePrice * selectedPeriod * (1 - discount / 100);
    };

    const getTotalPrice = (): number => {
        return selectedTariffs.reduce((total, tariff) => total + calculateDiscountedPrice(tariff), 0);
    };

    return (
        <PageContainer title="Тарифы" description="Тарифы">
            <div className="flex flex-col gap-3 mt-[30px]">
                <div className="font-bold text-[26px] text-[#000]">Корзина тарифов</div>
                
            </div>
            <div className="flex gap-2.5 months">
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
