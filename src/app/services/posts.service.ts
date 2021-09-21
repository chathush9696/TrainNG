import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Posts } from '../posts/posts';
import {catchError} from 'rxjs/operators'
import { throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input-error';

@Injectable({
  providedIn: 'root'
})
export class PostsService{
  constructor(private http: HttpClient) { }
  private url = 'https://jsonplaceholder.typicode.com/posts'
  
  
  getPosts(): Observable<Posts[]>{
    return this.http.get<Posts[]>(this.url)
  }

  createPost(post: Posts){
    return this.http.post<Posts>(this.url, JSON.stringify(post))
    .pipe(catchError((error: Response) => {
      if (error.status === 400){
        return throwError(new BadInputError(error))
      }
      return throwError(new AppError(error))
    }))
  }

  updatePost(post: Posts){
    return this.http.patch(this.url+'/'+post.id,JSON.stringify({isRed: true}))
  }

  deletePost(id: number){
    return this.http.delete(this.url+'/'+ id)
      .pipe(catchError((error: Response) => {
        if (error.status === 404){
          return throwError(new NotFoundError(error))
        }
        return throwError(new AppError(error))
      }))
  }
    
}
