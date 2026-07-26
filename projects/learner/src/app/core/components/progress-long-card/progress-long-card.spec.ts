import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressLongCard } from './progress-long-card';

describe('ProgressLongCard', () => {
  let component: ProgressLongCard;
  let fixture: ComponentFixture<ProgressLongCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressLongCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressLongCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
