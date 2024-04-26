export type StatsCategories = {
    date: string;
    revenue: number;
    average_bill: number;
    sales: number;
    remainings: number;
}

export type InfoCategories = {
    id: number;
    name: string;
    mp: string;
    parent_id: number;
    childrens: number[];
}


export type IProducts = {
    mp: "KE" | "UZ";
    product_id: number;
    title: string;
    image_url: string;
    revenue: number;
    order_amount: number;
    price: number;
    available_amount: number;
    rating: number;
    reviews_amount: number;
    sales_chart: number[]
}