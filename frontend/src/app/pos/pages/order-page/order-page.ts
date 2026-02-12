import { Component } from '@angular/core';
import { Orders } from "../../components/orders/orders";

@Component({
  selector: 'app-order-page',
  imports: [Orders],
  templateUrl: './order-page.html',
  styleUrl: './order-page.scss',
})
export class OrderPage {

}
