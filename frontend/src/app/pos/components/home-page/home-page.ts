import { Component, } from '@angular/core';
import { RouterLink, } from "@angular/router";
import { ProductService } from '../../services/product.service';



@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}
