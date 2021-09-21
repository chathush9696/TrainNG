import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';
import { BadInputError } from '../common/bad-input-error';
import { NotFoundError } from '../common/not-found-error';
import { PostsService } from '../services/posts.service';
import { Posts } from './posts';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  posts!: Posts[]
  private url = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private postsService: PostsService, private http: HttpClient){
    // this.postsService.getPosts()
    //   .subscribe(response => this.posts = response)
  }
  // constructor(http: HttpClient){
  //   http.get<Posts[]>('https://jsonplaceholder.typicode.com/posts')
  //     .subscribe(response => {
  //       this.posts = response
  //     }
  //   )
  // }
  ngOnInit(): void {
    this.postsService.getPosts()
      .subscribe(response => {
        this.posts = response;
      }, error => {
        alert('An unexpected error occurred');
        console.log(error);
      });
  }

  createPosts(input: HTMLInputElement){
    let post: any = {title: input.value}
    input.value = ''
    this.postsService.createPost(post)
      .subscribe(response => {
        console.log(response)
        post.id = response.id
        this.posts.splice(0,0,post)
      },(error: AppError) => {
        if(error instanceof BadInputError)
          //this.form.setError(error.originalError)
        alert('An unexpected error occurred');
        console.log(error);
      })
  }

  updatePost(post: Posts){
    this.postsService.updatePost(post)
      .subscribe(response => {
        console.log(response)
      },error => {
        alert('An unexpected error occurred');
        console.log(error);
      })
  }

  deletePost(post: Posts){
    this.postsService.deletePost(350)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index,1);
      },(error: AppError) => {
        if (error instanceof NotFoundError){
          alert('This post already deleted');
          console.log(error);
        }else{
          alert('An unexpected error occurred');
          console.log(error);
        }
      })
  }


}


