import { AfterViewInit, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MoviesComponent } from '../movies.component';
@Component({
  selector: 'app-video-films',
  templateUrl: './video-films.component.html',
  styleUrls: ['./video-films.component.scss']
})
export class VideoFilmsComponent implements AfterViewInit{
  videos: any = [];
  categories: any = [];
  public error: string = '';
  date = new Date().toLocaleDateString();
  isHidden = false;
  active: string = '';
  active_video: string = '';
  solutionChange: boolean = false;
  solution: string = '480p';
  constructor(public movies: MoviesComponent) { }

  async ngAfterViewInit() {

    this.resetActiveVideo();
    this.addHoverEndListener();
    addEventListener('fullscreenchange', (e) => {
      if (!document.fullscreenElement && this.active_video.length > 0) {
        this.active = this.active_video;
        this.active_video = '';
        this.isHidden = true;
      }
    }
    );
  }

  addHoverEndListener() {
      document.getElementById('movies')!.addEventListener('mouseover', (e) => {
        const container: any = document.getElementById('fContainer');
        const target = e.target as HTMLElement;
        if (this.movies.videos_loaded && container.children[container.children.length - 1].contains(target)) {
          container.parentElement.scrollLeft = container.scrollWidth - container.clientWidth;
        }
      });
  }

  startVideo(id: number) {
    let video: any = document.getElementById('videoPlayer' + id);
    let playButton: any = document.getElementById('playButton' + id);
    let pauseButton: any = document.getElementById('pauseButton' + id);
    playButton.classList.add('d-none');
    pauseButton.classList.remove('d-none');
    this.isHidden = false;
    this.movies.openFullscreen(video);
    this.active_video = id.toString();
    this.active = '';
    video.play();
  }

  pauseVideo(id: number) {
    let video: any = document.getElementById('videoPlayer' + id);
    let playButton: any = document.getElementById('playButton' + id);
    let pauseButton: any = document.getElementById('pauseButton' + id);
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
        const videoPlayer = document.getElementById('videoPlayer' + this.active);
        if (videoPlayer && !videoPlayer.contains(target) && this.isHidden) {
          this.isHidden = false;
          this.active_video = '';
          this.active = '';
        }
      }
    });
  }

  playerFormatChange(video: string, path: string, id: number) {
    let videoSource: any = document.getElementById('videoSource' + id);
    let videoContainer: any = document.getElementById('videoPlayer' + id);
    let newPath = path.split('/');
    newPath.splice(0, 3);
    videoSource.src = environment.baseUrl + '/' + newPath[0] + '/' + newPath[1] + '/' + newPath[2];
    this.solutionChange = !this.solutionChange;
    this.solution = video;
    videoContainer.load();
  }

}
