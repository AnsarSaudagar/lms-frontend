import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSettings } from './course-settings';

describe('CourseSettings', () => {
  let component: CourseSettings;
  let fixture: ComponentFixture<CourseSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
