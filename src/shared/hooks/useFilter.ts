interface IPropsUseFilter {
    filters?: {
        [key: string]: number[];
    };
    search?: string | number;
    setting: {
        MAX_RANGE: number;
        MIN_RANGE: number;
        MAX_RATING: number;
    };
}

const formatRangeFilter = (
    key: string,
    range: number[] | undefined,
    setting: { MIN_RANGE: number; MAX_RANGE: number }
): string | undefined => {
    if (range && range.length !== 0) {
        const isEmptyRange =
            range[0] === setting.MIN_RANGE && range[1] === setting.MAX_RANGE;
        // Возвращаем undefined, если фильтр не изменён
        return isEmptyRange ? undefined : `${key}:${range[0]}..${range[1]}`;
    }
    return undefined;
};

const formatSearchFilter = (
    search: string | number | undefined
): string | null => {
    if (typeof search === "string") {
        // Проверяем, содержит ли строка только цифры
        const isNumericString = /^\d+$/.test(search);
        if (isNumericString) {
            return `product_id:${parseInt(search, 10)}`;
        } else {
            return `title:~${search}`;
        }
    } else if (typeof search === "number") {
        return `product_id:${search}`;
    } else {
        return null;
    }
};

export const useFilter = ({
    filters,
    search,
    setting,
}: IPropsUseFilter): string | undefined => {
    if (!filters && !search) {
        return undefined;
    }

    const revenueRange = formatRangeFilter("revenue", filters?.revenueRange, setting);
    const orderAmountRange = formatRangeFilter("order_amount", filters?.orderAmountRange, setting);
    const priceRange = formatRangeFilter("price", filters?.priceRange, setting);
    const availableAmountRange = formatRangeFilter("available_amount", filters?.availableAmountRange, setting);
    const rating = formatRangeFilter("rating", filters?.rating, setting);
    const reviewsAmount = formatRangeFilter("reviews_amount", filters?.reviewsAmount, setting);

    const searchFilter = formatSearchFilter(search);

    // Фильтруем только определённые и непустые значения
    const filterString = [
        revenueRange,
        orderAmountRange,
        priceRange,
        availableAmountRange,
        rating,
        reviewsAmount,
        searchFilter,
    ]
        .filter((filter) => filter !== undefined && filter !== null && filter !== "")
        .join(";");

    return filterString ? `&filter=${filterString}` : "";
};
