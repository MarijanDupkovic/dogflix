import { HttpClient } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  videos: any = [];
  videos_loaded = false;
  categories_loaded = false;
  categories: any;
  constructor(private http: HttpClient) { }

  async ngOnInit() {
     await this.loadFromServer('/videos');
     await this.loadFromServer('/categories');
  }


  async loadFromServer(path: string) {
    const url = environment.baseUrl + path;
    if (path === '/videos') {
      this.videos = await lastValueFrom(this.http.get(url));
      setTimeout(() => {
        this.videos_loaded = true;
      }, 2000);
      return this.videos;
    } else if (path === '/categories') {
      this.categories = await lastValueFrom(this.http.get(url));
      this.categories_loaded = true;
      return this.categories;
    } 
  }

  public showCategory(id: number) {
    const category = this.categories.find((c: any) => c.id === id);
    if (category) return category.name;
    return '';
  }

  public convertDate(date: string) {
    return date.split('-').reverse().join('-');
  }

  openFullscreen(video: any) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
      video.msRequestFullscreen();
    }
  }

  convertVideoPath(path: string) {
    let newPath = path.split('/');
    newPath.splice(0, 3);
    return environment.baseUrl + '/' + newPath[0] + '/' + newPath[1] + '/' + newPath[2];
  }
}
