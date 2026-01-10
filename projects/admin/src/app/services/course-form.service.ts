import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CourseFormService {
  readonly form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      details: this.fb.group({
        title: ['', Validators.required],
        descriptions: ['', Validators.required],
      }),
      settings: this.fb.group({
        difficultyLevel : ['', Validators.required],
        category: ['', Validators.required],
        price: [0, Validators.required]
      })
    })
  }
}
