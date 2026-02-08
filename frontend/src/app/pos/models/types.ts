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
    date: string;
    order_items: [
        {
            product_name: string,
            product_price: number,
            qty: number
        }
    ]
}

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface LoginForm {
    name: string;
    password: string
}

export interface LoginResponse {
    "access_token": string,
    "token_type": "bearer",
    "expires_in": 3600,
    "user": User
}

export interface User {
    "id": number,
    "name": string,
    "role": string,
    "email": string,
    "email_verified_at": string | null,
    "created_at": string,
    "updated_at": string
}