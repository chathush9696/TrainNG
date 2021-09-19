import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  post = {
    title: "Title",
    isFavorite: false
  }

  onFavoriteChange(isFavorite: any){
    console.log('favorite changed', isFavorite)
  }
}
