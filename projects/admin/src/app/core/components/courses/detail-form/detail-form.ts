import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-detail-form',
  imports: [EditorModule, ReactiveFormsModule],
  templateUrl: './detail-form.html',
  styleUrl: './detail-form.css',
})
export class DetailForm {
  courseForm: FormGroup;

  constructor() {
    this.courseForm = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required])
    })
  }
}
