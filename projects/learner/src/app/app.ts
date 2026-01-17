import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { CourseService } from './services/courses.service';

@Component({
  selector: 'app-root',
  imports: [ ButtonModule, FormsModule, TagModule, CommonModule, RatingModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('learner');

  constructor(private courseService: CourseService){}

  courses: any[] = [
    // {
    //   id: 1,
    //   title: 'The Complete Angular Masterclass 2026',
    //   instructor: 'Dr. Sarah Smith',
    //   thumbnail: 'https://placehold.co/600x400/png',
    //   rating: 4.8,
    //   reviews: 12540,
    //   price: 12.99,
    //   originalPrice: 84.99,
    //   badge: 'Bestseller'
    // },
    // // Add more mock objects here...
  ];

  ngOnInit(){
    this.courseService.getAllCourses().subscribe({
      next: (courses: any) => {
        this.courses = courses;
      }
    });
  }
}
