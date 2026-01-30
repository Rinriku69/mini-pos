import { AfterViewInit, Component, computed, effect, ElementRef, HostListener, inject, OnInit, Signal, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../services/cart-service';


import { NavService } from '../../services/nav-service';
import { filter, map } from 'rxjs';
import { Icon } from "../icons/icon/icon";

@Component({
  selector: 'app-pos-nav',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon],
  templateUrl: './pos-nav.html',
  styleUrl: './pos-nav.scss',
})
export class PosNav implements AfterViewInit {
  protected readonly title = signal('mini-pos');
  private router = inject(Router)
  private cartService = inject(CartService)
  private navService = inject(NavService)
  cart = toSignal(this.cartService.cart$)
  private route$ = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    map(() => this.router.url)
  );
  currentUrl = toSignal(this.route$, { initialValue: this.router.url });

  showSearch = computed(() =>
    this.currentUrl().startsWith('/main/store') || this.currentUrl().startsWith('/main/orders')
  );

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
