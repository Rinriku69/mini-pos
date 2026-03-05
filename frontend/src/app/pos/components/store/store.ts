import { Component, computed, effect, inject, input, OnInit, signal, Signal } from '@angular/core';
import { Product } from '../../models/types';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from "./product-card/product-card";

import { NavService } from '../../services/nav.service';



@Component({
  selector: 'app-store',
  imports: [ProductCard],
  templateUrl: './store.html',
  styleUrl: './store.scss',
})
export class Store {
  
  products = input.required<Product[]>();
 

}
