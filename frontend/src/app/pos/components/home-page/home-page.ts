import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { RouterLink, } from "@angular/router";
import { ProductService } from '../../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  private productService = inject(ProductService)


  constructor() { }

  ngOnInit(): void {

  }

}
