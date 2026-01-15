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
    product: Product;
    qty: number
}

export interface Order {
    order_id: number;
    total: number;
    order_items: [
        {
            product_name: string,
            product_price: number,
            qty: number
        }
    ]
}

