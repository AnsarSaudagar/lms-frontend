import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLogger } from './error-logger';

describe('ErrorLogger', () => {
  let component: ErrorLogger;
  let fixture: ComponentFixture<ErrorLogger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorLogger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorLogger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
