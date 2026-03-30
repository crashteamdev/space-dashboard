import { useState } from "react";
import {
    SUBSCRIPTION_ALLOWED_MONTHS,
    SUBSCRIPTION_DEFAULT_MONTHS,
    type SubscriptionPeriod
} from "@/shared/config/subscription";

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

export const useCart = () => {
    const [selectedTariffs, setSelectedTariffs] = useState<Tariff[]>([]);
    const [selectedPeriod, setSelectedPeriod] = useState<SubscriptionPeriod>(SUBSCRIPTION_DEFAULT_MONTHS);

    const handleTariffChange = (tariff: Tariff) => {
        setSelectedTariffs((prevSelected) => {
            const updatedSelection = prevSelected.filter(t => t.parentId !== tariff.parentId);
            return [...updatedSelection, tariff];
        });
    };

    const handleTariffRemove = (tariffId: number) => {
        setSelectedTariffs((prevSelected) => prevSelected.filter(t => t.id !== tariffId));
    };

    const handlePeriodChange = (period: SubscriptionPeriod) => {
        if (!(SUBSCRIPTION_ALLOWED_MONTHS as readonly number[]).includes(period)) {
            return;
        }
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

    return {
        selectedTariffs,
        selectedPeriod,
        handleTariffChange,
        handleTariffRemove,
        handlePeriodChange,
        getTotalPrice
    };
};
