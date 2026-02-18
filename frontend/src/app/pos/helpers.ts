import { Cart } from "./models/types";
export * from './helpers/resource'


export function createCart(): Cart {
    return {

        order_item: [],
    }
}

