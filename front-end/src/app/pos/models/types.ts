export interface Product {
    id: number;
    product_name: string;
    product_description: string;
    price: number;
    category_name: string
}
export interface Category {
    id: number;
    category_name: string;
}

export interface Cart {
    order_item: OrderItem[];
}

export interface OrderItem {
    id?: number;
    order_id?: number;
    product: Product;
    qty: number
}

