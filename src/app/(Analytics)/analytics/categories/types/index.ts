export type Categories = {
    id: number;
    name: string;
    mp: string;
    analytics: CategoriesAnalytics;
    difference_percent: CategoriesAnalytics;
    previous_period_analytics: CategoriesAnalytics;
    childrens: number[];
    subRows?: Categories[];
}

export type CategoriesAnalytics = {
    revenue: number;
    revenue_per_product: number;
    order_amount: number;
    product_count: number;
    order_per_product: number;
    average_bill: number;
    seller_count: number;
    order_per_seller: number;
}