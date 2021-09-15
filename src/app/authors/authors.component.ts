import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  title = "They are Authors";
  authors: string[] = []
  constructor(
    service: AuthorsService
  ) { 
    this.authors = service.getAuthors()
  }

  ngOnInit(): void {
  }

}
