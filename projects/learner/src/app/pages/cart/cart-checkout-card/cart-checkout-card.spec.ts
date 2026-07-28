import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCheckoutCard } from './cart-checkout-card';

describe('CartCheckoutCard', () => {
  let component: CartCheckoutCard;
  let fixture: ComponentFixture<CartCheckoutCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartCheckoutCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartCheckoutCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
