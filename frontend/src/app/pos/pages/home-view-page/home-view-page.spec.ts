import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewPage } from './home-view-page';

describe('HomeViewPage', () => {
  let component: HomeViewPage;
  let fixture: ComponentFixture<HomeViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeViewPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeViewPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
