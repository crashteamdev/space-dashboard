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
};

const formatRangeFilter = (
    key: string,
    range: number[] | undefined,
    setting: { MIN_RANGE: number; MAX_RANGE: number }
): string | undefined => {
    if (range && range.length !== 0) {
        const isEmptyRange =
            range[0] === setting.MIN_RANGE && range[1] === setting.MAX_RANGE;
        return isEmptyRange ? "" : `${key}:${range[0]}..${range[1]}`;
    }
};

const formatSearchFilter = (
    search: string | number | undefined
): string | null => {
    if (typeof search === "string") {
        // Проверяем, содержит ли строка только цифры
        const isNumericString = /^[0-9]+$/.test(search);

        if (isNumericString) {
            // Если строка состоит только из цифр, возвращаем число
            return `product_id:${parseInt(search, 10)}`;
        } else {
            // В противном случае возвращаем фильтр по заголовку
            return `title:~${search}`;
        }
    } else if (typeof search === "number") {
        // Если передано число, возвращаем фильтр по product_id
        return `product_id:${search}`;
    } else {
        // Если search не определен или не является строкой или числом, возвращаем null
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

    const revenueRange = formatRangeFilter(
        "revenue",
        filters?.revenueRange,
        setting
    );
    const orderAmountRange = formatRangeFilter(
        "order_amount",
        filters?.orderAmountRange,
        setting
    );
    const priceRange = formatRangeFilter("price", filters?.priceRange, setting);
    const availableAmountRange = formatRangeFilter(
        "available_amount",
        filters?.availableAmountRange,
        setting
    );
    const rating = formatRangeFilter("rating", filters?.rating, setting);
    const reviewsAmount = formatRangeFilter(
        "reviews_amount",
        filters?.reviewsAmount,
        setting
    );

    const searchFilter = formatSearchFilter(search);

    const filterString = [
        revenueRange,
        orderAmountRange,
        priceRange,
        availableAmountRange,
        rating,
        reviewsAmount,
        searchFilter,
    ]
        .filter((filter) => filter !== undefined && filter !== null)
        .join(";");

    return filterString ? `&filter=${filterString}` : "";
};