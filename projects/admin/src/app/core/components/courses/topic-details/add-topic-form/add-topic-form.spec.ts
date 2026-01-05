import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopicForm } from './add-topic-form';

describe('AddTopicForm', () => {
  let component: AddTopicForm;
  let fixture: ComponentFixture<AddTopicForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTopicForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTopicForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
