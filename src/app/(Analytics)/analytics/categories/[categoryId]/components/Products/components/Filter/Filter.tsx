import React, {Fragment, useState} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { AppSlider } from "@/shared/components/AppSlider";
import { useLocalStorage } from "@uidotdev/usehooks";
import { marketplace } from "@/app/(Analytics)/analytics/categories/statics";

type IFilter = {
    isOpen: boolean;
    setIsOpen: (arg: boolean) => void;
    onApplyFilters: any;
}

export const Filter = ({isOpen, setIsOpen, onApplyFilters}: IFilter) => {
    const [market] = useLocalStorage("market", marketplace[0]);
    const max = market.value === "KE" ? 999999999 : 999999999999;
    const [revenueRange, setRevenueRange] = useState([0, max]);
    const [orderAmountRange, setOrderAmountRange] = useState([0, max]);
    const [priceRange, setPriceRange] = useState([0, max]);
    const [availableAmountRange, setAvailableAmountRange] = useState([0, max]);
    const [rating, setRating] = useState([0, 5]);
    const [reviewsAmount, setReviewsAmount] = useState([0, max]);
    const applyFilters = () => {
        const newFilters = {
            revenueRange,
            orderAmountRange,
            priceRange,
            availableAmountRange,
            rating,
            reviewsAmount
        };
        onApplyFilters(newFilters);
        setIsOpen(false);
    };

    const resetFilters = () => {
        setRevenueRange([0, max]);
        setOrderAmountRange([0, max]);
        setPriceRange([0, max]);
        setAvailableAmountRange([0, max]);
        setRating([0, 5]);
        setReviewsAmount([0, max]);
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-[#000]/25" />
                    </Transition.Child>
    
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-100"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-center relative">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 text-center"
                                    >
                                        Фильтры
                                    </Dialog.Title>
                                    <button className="absolute right-3 pointer" onClick={() => setIsOpen(false)}>
                                        <XMarkIcon width={23} height={23} />
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <AppSlider label="Выручка" range={revenueRange} setRange={setRevenueRange} max={max} />
                                    <AppSlider label="Продажи" range={orderAmountRange} setRange={setOrderAmountRange} max={max} />
                                    <AppSlider label="Цена" range={priceRange} setRange={setPriceRange} max={max} />
                                    <AppSlider label="Остатки" range={availableAmountRange} setRange={setAvailableAmountRange} max={max} />
                                    <AppSlider minDistance={0} label="Рейтинг" range={rating} setRange={setRating} max={5} />
                                    <AppSlider label="Отзывов" range={reviewsAmount} setRange={setReviewsAmount} max={max} />
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={applyFilters}
                                    >
                                        Применить
                                    </button>
                                    <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={resetFilters}
                                    >
                                        Сбросить
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};