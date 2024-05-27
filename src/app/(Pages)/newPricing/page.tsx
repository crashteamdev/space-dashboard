"use client";

import PageContainer from "@/components/ui/container/PageContainer";
import { AppAccordionGroup } from "@/shared/components/AppAccordionGroup";
import { AppButton } from "@/shared/components/AppButton";
import React, { useEffect, useState } from "react";
import { formattedAccordion } from "./statics";

const NewPricing = () => {
    const [selectedTariff, setSelectedTariff] = useState<string | null>(null);

    useEffect(() => {
        console.log(selectedTariff);
    }, [selectedTariff]);
    return (
        <PageContainer title="Тарифы" description="Тарифы">
            <div className="flex flex-col gap-3 mt-[30px]">
                <div className="font-bold text-[26px] text-[#000]">Корзина тарифов</div>
                <fieldset className="grid grid-cols-2 gap-4">
                    <legend className="sr-only">Delivery</legend>
                    <div>
                        <label
                        htmlFor="DeliveryPriority"
                        className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                        >
                        <div>
                            <p className="text-gray-700">1 месяц</p>
                        </div>
                        <input
                            type="radio"
                            name="DeliveryOption"
                            value="DeliveryPriority"
                            id="DeliveryPriority"
                            className="size-5 border-gray-300 text-blue-500"
                        />
                        </label>
                    </div>
                    <div>
                        <label
                        htmlFor="DeliveryPriority"
                        className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                        >
                        <div>
                            <p className="text-gray-700">3 месяца</p>

                            <p className="mt-1 text-gray-900">-10%</p>
                        </div>

                        <input
                            type="radio"
                            name="DeliveryOption"
                            value="DeliveryPriority"
                            id="DeliveryPriority"
                            className="size-5 border-gray-300 text-blue-500"
                        />
                        </label>
                    </div>
                </fieldset>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-[40px]">
                <div className="col-span-9">
                    <AppAccordionGroup
                        items={formattedAccordion || []}
                        isFirstOpen={false}
                        accordionContentSlot={(item) => (
                            <div>
                                {item.tariffs && item.tariffs.map((tariff, index) => (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name={`tariff-${item.id}`}
                                            value={tariff.name}
                                            checked={selectedTariff === tariff.name}
                                            onChange={() => setSelectedTariff(tariff.name)}
                                        />
                                        {tariff.name}: {tariff.price}
                                    </label>
                                ))}
                                </div>
                        )}
                    />
                </div>
                <div className="col-span-3">
                    <div className="bg-[#fff] pt-[20px] pb-[15px] rounded-lg shadow-[unset]">
                        <div className="font-bold text-[22px] px-[15px]">Корзина</div>
                        <hr className="bg-[#efefef] my-[15px] h-[1px] border-none" />
                        <div className="flex flex-col px-[15px]">
                            <div className="font-semibold text-[16px] mb-[10px]">Итого:</div>
                            <div className="font-semibold text-[24px] mb-[20px]">0 ₽/мес.</div>
                            <AppButton tag="a" href="/" className="flex justify-center font-bold">Купить</AppButton>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default NewPricing;
