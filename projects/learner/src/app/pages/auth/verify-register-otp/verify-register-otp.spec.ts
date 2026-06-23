import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRegisterOtp } from './verify-register-otp';

describe('VerifyRegisterOtp', () => {
  let component: VerifyRegisterOtp;
  let fixture: ComponentFixture<VerifyRegisterOtp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyRegisterOtp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyRegisterOtp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
