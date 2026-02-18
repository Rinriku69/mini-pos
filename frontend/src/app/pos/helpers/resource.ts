import { httpResource } from "@angular/common/http";
import { Category, Product } from "../models/types";

export function loadProduct() {
    const productApiUrl = 'http://127.0.0.1:8000/api/products';
    return httpResource<{ data: Product[] }>(() => ({
        url: productApiUrl
    })
    )
}
export function loadCategory() {
    const categoryApiUrl = 'http://127.0.0.1:8000/api/categories';
    return httpResource<{ data: Category[] }>(() => ({
        url: categoryApiUrl
    })
    )
}