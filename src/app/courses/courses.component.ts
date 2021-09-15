import { Component, inject, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'courses',
  template: `
    <h2>{{ title }}</h2>
      <button class="btn btn-primary">save</button>
      <ul>
        <li *ngFor="let course of courses">
          {{ course }}
        </li>
      </ul>`,//./courses.component.html
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  title = "List of Course";
  courses: string[] = []
  constructor(
    service: CoursesService
  ) { 
    this.courses = service.getCourses()
  }

  ngOnInit(): void {
  }

}
