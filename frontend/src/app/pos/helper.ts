import { HttpHeaders } from "@angular/common/http";
import { Cart } from "./models/types";
import { readonly } from "@angular/forms/signals";


export function createCart(): Cart {
    return {

        order_item: [],
    }

}

