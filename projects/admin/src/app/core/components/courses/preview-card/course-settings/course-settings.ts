import { Component, computed } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CourseService } from '../../../../../services/course.service';
import { Category } from '../../../../../models/category.model';
import { JsonPipe } from '@angular/common';
import { CourseFormService } from '../../../../../services/course-form.service';

@Component({
  selector: 'app-course-settings',
  imports: [
    FormsModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    SelectModule,
    ToggleSwitchModule,
    ReactiveFormsModule
  ],
  templateUrl: './course-settings.html',
  styleUrl: './course-settings.css',
})
export class CourseSettings {

  courseSettingsForm: FormGroup;
  selectedLevel: string = 'beginner';
  selectedCategory: string = 'tech';
  isDraft: boolean = true;
  allowEnrollment: boolean = false;
  price = 0;

  categories = computed(() => {
    const categories = this.courseService.categories();
    const formatedCategories = categories.map((category: Category) => {
      return {
        label: category.name,
        value: category._id
      }
    });

    return formatedCategories;
  });

  levels = computed(() => {
    const levelObj = this.courseService.difficultyLevel();
    const levelArr = Object.keys(this.courseService.difficultyLevel());

    const formattedLevels = levelArr.map((level) => {
      
      return {
        value: level,
        label: levelObj[level]
      }
    });
    return formattedLevels;
  })


  constructor(private courseService: CourseService, private courseFormService: CourseFormService) { 
    this.courseSettingsForm = this.courseFormService.form;
  }



}
