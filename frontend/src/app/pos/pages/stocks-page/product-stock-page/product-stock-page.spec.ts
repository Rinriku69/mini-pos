import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStockPage } from './product-stock-page';

describe('ProductStockPage', () => {
  let component: ProductStockPage;
  let fixture: ComponentFixture<ProductStockPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStockPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStockPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
