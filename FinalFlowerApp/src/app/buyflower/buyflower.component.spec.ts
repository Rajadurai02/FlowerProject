import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyflowerComponent } from './buyflower.component';

describe('BuyflowerComponent', () => {
  let component: BuyflowerComponent;
  let fixture: ComponentFixture<BuyflowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyflowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyflowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
