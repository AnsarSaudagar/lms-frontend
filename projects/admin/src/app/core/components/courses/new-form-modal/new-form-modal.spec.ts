import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormModal } from './new-form-modal';

describe('NewFormModal', () => {
  let component: NewFormModal;
  let fixture: ComponentFixture<NewFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFormModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFormModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
