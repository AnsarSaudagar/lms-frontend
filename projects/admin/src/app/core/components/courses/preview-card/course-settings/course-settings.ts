import { Component, computed } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CourseService } from '../../../../../services/course.service';
import { Category } from '../../../../../models/category.model';

@Component({
  selector: 'app-course-settings',
  imports: [
    FormsModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    SelectModule,
    ToggleSwitchModule,
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

  selectedLevel: string = 'beginner';
  selectedCategory: string = 'tech';
  isDraft: boolean = true;
  allowEnrollment: boolean = false;
  price = 0;

  // categories = [
  //   { label: 'Technology', value: 'tech' },
  //   { label: 'Design', value: 'design' },
  //   { label: 'Marketing', value: 'marketing' }
  // ];
  
  categories = computed(() => {
    const categories = this.courseService.categories();


    const formatedCategories = categories.map((category: Category) => {
      return {
        label: category.name,
        value: category._id
      }
    });

    return formatedCategories;
  })

  constructor(private courseService: CourseService) { }



}
