import React, {Fragment, useState} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { AppSlider } from "@/shared/components/AppSlider";

type IFilter = {
    isOpen: boolean;
    setIsOpen: (arg: boolean) => void;
    onApplyFilters: any;
}

export const Filter = ({isOpen, setIsOpen, onApplyFilters}: IFilter) => {
    const [revenueRange, setRevenueRange] = useState([0, 999999999]);
    const [orderAmountRange, setOrderAmountRange] = useState([0, 999999999]);
    const [priceRange, setPriceRange] = useState([0, 999999999]);
    const [availableAmountRange, setAvailableAmountRange] = useState([0, 999999999]);
    const [rating, setRating] = useState([0, 5]);
    const [reviewsAmount, setReviewsAmount] = useState([0, 999999999]);

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
                                    <AppSlider label="Выручка" range={revenueRange} setRange={setRevenueRange} max={999999999} />
                                    <AppSlider label="Продажи" range={orderAmountRange} setRange={setOrderAmountRange} max={999999999} />
                                    <AppSlider label="Цена" range={priceRange} setRange={setPriceRange} max={999999999} />
                                    <AppSlider label="Остатки" range={availableAmountRange} setRange={setAvailableAmountRange} max={999999999} />
                                    <AppSlider minDistance={0} label="Рейтинг" range={rating} setRange={setRating} max={5} />
                                    <AppSlider label="Отзывов" range={reviewsAmount} setRange={setReviewsAmount} max={999999999} />
                                </div>
                                <div className="mt-4">
                                    <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={applyFilters}
                                    >
                                        Применить
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