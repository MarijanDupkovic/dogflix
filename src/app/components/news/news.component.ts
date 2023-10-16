import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  videos: any = [];
  date = new Date().getTime();
  categories: any = [];
  public error: string = '';
  isHidden = false;
  active: string = '';
  active_video: string = '';
  solutionChange: boolean = false;
  solution: string = '480p';

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.videos = await this.loadFromServer('/videos');
    this.categories = await this.loadFromServer('/categories');
    this.resetActiveVideo();
    this.addFullScreenChangeLister();
  }

  timedifference(date: any) {
    date = new Date(date).getTime();
    let diff = (this.date - date) / (1000 * 3600 * 24)
    if (diff < 7) return true;
    return false;
  }

  addFullScreenChangeLister() {
    addEventListener('fullscreenchange', (e) => {
      if (!document.fullscreenElement && this.active_video.length > 0) {
        this.active = this.active_video;
        this.active_video = '';
        this.isHidden = true;
      }
    });
  }

  startVideo(id: number) {
    let video: any = document.getElementById('nVideoPlayer' + id);
    let playButton: any = document.getElementById('nPlayButton' + id);
    let pauseButton: any = document.getElementById('nPauseButton' + id);
    playButton.classList.add('d-none');
    pauseButton.classList.remove('d-none');
    this.isHidden = false;
    this.openFullscreen(video);
    this.active_video = id.toString();
    this.active = '';
    video.play();
  }

  pauseVideo(id: number) {
    let video: any = document.getElementById('nVideoPlayer' + id);
    let playButton: any = document.getElementById('nPlayButton' + id);
    let pauseButton: any = document.getElementById('nPauseButton' + id);
    pauseButton.classList.add('d-none');
    playButton.classList.remove('d-none');
    video.pause();
  }

  resetActiveVideo() {
    document.addEventListener('click', (e: Event) => {
      if (this.active.length > 0) {
        e.preventDefault();
        e.stopPropagation();
        const target = e.target as HTMLElement;
        const videoPlayer = document.getElementById('nVideoPlayer' + this.active);
        if (videoPlayer && !videoPlayer.contains(target) && this.isHidden) {
          this.isHidden = false;
          this.active_video = '';
          this.active = '';
        }
      }
    });
  }

  playerFormatChange(video: string, path: string, id: number) {
    let videoSource: any = document.getElementById('nVideoSource' + id);
    let videoContainer: any = document.getElementById('nVideoPlayer' + id);
    let newPath = path.split('/');
    newPath.splice(0, 3);
    videoSource.src = environment.baseUrl + '/' + newPath[0] + '/' + newPath[1] + '/' + newPath[2];
    this.solutionChange = !this.solutionChange;
    this.solution = video;
    videoContainer.load();
  }

  loadFromServer(path: string) {
    const url = environment.baseUrl + path;
    return lastValueFrom(this.http.get(url));
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
