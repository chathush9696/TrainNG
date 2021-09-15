import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  title= "List of Course";
  courses = ["course1","course2","course3"];

  constructor() { }

  ngOnInit(): void {
  }

}
