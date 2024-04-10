export const formatNumber = (number: number) => {
    return number.toLocaleString("ru-RU", {
        maximumFractionDigits: 0,
    });
};