import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosNav } from './pos-nav';

describe('PosNav', () => {
  let component: PosNav;
  let fixture: ComponentFixture<PosNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
