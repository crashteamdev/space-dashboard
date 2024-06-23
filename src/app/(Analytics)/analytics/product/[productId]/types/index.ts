export interface ProductStats {
    mp: string;
    product_id: number;
    title: string;
    image_url: string;
    seller: {
        seller_link: string;
        seller_title: string;
    };
    category: {
        id: number;
        name: string;
    };
    revenue: number;
    full_price: number;
    price: number;
    rating: number;
    reviews_amount: number;
    appear_at: string;
    price_chart: number[];
    revenue_chart: number[];
    sales_chart: number[];
    remainings_chart: number[];
}

export interface StaticProductData {
    title: string;
    image_url: string;
    seller: {
        seller_link: string;
        seller_title: string;
    };
    category: {
        id: number;
        name: string;
    };
    rating: number;
    reviews_amount: number;
    appear_at: string;
}

export interface DynamicProductData {
    revenue: number;
    full_price: number;
    price: number;
    price_chart: number[];
    revenue_chart: number[];
    sales_chart: number[];
    remainings_chart: number[];
}