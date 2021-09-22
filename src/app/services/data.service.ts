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
export class DataService{
  constructor(private http: HttpClient) { }
  private url = 'https://fsdfdjsonplaceholder.typicode.com/posts'
  
  
  getAll(): Observable<Posts[]>{
    return this.http.get<Posts[]>(this.url)
  }

  create(resource: any){
    return this.http.post<Posts>(this.url, JSON.stringify(resource))
    .pipe(catchError((error: Response) => {
      if (error.status === 400){
        return throwError(new BadInputError(error))
      }
      return throwError(new AppError(error))
    }))
  }

  update(resource: any){
    return this.http.patch(this.url+'/'+resource.id,JSON.stringify({isRed: true}))
  }

  delete(id: number){
    return this.http.delete(this.url+'/'+ id)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: Response){
    if (error.status === 404){
      return throwError(new NotFoundError(error))
    }

    if (error.status === 400){
      return throwError(new BadInputError(error))
    }
    return throwError(new AppError(error))
  }
    
}
