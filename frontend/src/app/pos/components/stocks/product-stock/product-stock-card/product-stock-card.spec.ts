import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStockCard } from './product-stock-card';

describe('ProductStockCard', () => {
  let component: ProductStockCard;
  let fixture: ComponentFixture<ProductStockCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStockCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStockCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
