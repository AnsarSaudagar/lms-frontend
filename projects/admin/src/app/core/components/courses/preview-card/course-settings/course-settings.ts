import { Component } from '@angular/core';
import { SelectModule } from 'primeng/select'; // PrimeNG renamed Dropdown to Select in v19+
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-course-settings',
  imports: [FormsModule, 
    InputTextModule, 
    SelectModule,
    ButtonModule,
    SelectModule,
    ToggleSwitchModule
  ],
  templateUrl: './course-settings.html',
  styleUrl: './course-settings.css',
})
export class CourseSettings {
  
  levels = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' }
  ];

  categories = [
    { label: 'Technology', value: 'tech' },
    { label: 'Design', value: 'design' },
    { label: 'Marketing', value: 'marketing' }
  ];

  
  selectedLevel: string = 'beginner';
  selectedCategory: string = 'tech';
  isDraft: boolean = true;
  allowEnrollment: boolean = false;
}
