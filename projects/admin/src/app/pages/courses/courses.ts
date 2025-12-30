import { Component } from '@angular/core';
import {  ButtonModule } from "primeng/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-courses',
  imports: [ButtonModule, RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {

}
