import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListing } from './project-listing';

describe('ProjectListing', () => {
  let component: ProjectListing;
  let fixture: ComponentFixture<ProjectListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
