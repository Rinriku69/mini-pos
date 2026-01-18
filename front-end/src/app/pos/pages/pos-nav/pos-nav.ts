import { AfterViewInit, Component, computed, effect, ElementRef, HostListener, inject, OnInit, Signal, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../services/cart-service';


import { NavService } from '../../services/nav-service';

@Component({
  selector: 'app-pos-nav',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './pos-nav.html',
  styleUrl: './pos-nav.scss',
})
export class PosNav implements AfterViewInit {
  protected readonly title = signal('mini-pos');
  private cartService = inject(CartService)
  private navService = inject(NavService)
  cart = toSignal(this.cartService.cart$)

  readonly searchKey = signal('');

  cartBumpActive = toSignal(this.cartService.cartBumpActive)
  cartCount = computed(() => {
    const cart = this.cart()
    if (!cart) {
      return 0
    } else {
      return cart.order_item.length
    }
  })
  cartIcon = viewChild<ElementRef<HTMLElement>>('cartIcon');


  constructor() {
    effect(() => {
      this.navService.searchUpdate(this.searchKey())
    })
  }

  ngAfterViewInit() {
    this.cartService.getCartIcon(this.cartIcon()!.nativeElement);
  }



}
