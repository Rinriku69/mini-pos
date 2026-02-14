import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizePage } from './unauthorize-page';

describe('UnauthorizePage', () => {
  let component: UnauthorizePage;
  let fixture: ComponentFixture<UnauthorizePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthorizePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthorizePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
