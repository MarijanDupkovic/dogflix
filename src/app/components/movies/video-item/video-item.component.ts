import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MoviesComponent } from '../movies.component';
@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements AfterViewInit {
  videos: any = [];
  date = new Date().getTime();
  categories: any = [];
  public error: string = '';
  isHidden = false;
  active: string = '';
  active_video: string = '';
  solutionChange: boolean = false;
  solution: string = '480p';
  constructor(public movies: MoviesComponent) { }

  ngAfterViewInit() {
    this.resetActiveVideo();
    this.addHoverEndListener();
    this.addFullScreenChangeLister();
  }

  timedifference(date: any) {
    date = new Date(date).getTime();
    let diff = (this.date - date) / (1000 * 3600 * 24)
    if (diff < 10) return true;
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

  addHoverEndListener() {
    
      document.getElementById('movies')!.addEventListener('mouseover', (e) => {
        const container: any = document.getElementById('nContainer');
        const target = e.target as HTMLElement;
        if (this.movies.videos_loaded && container.children[container.children.length - 2].contains(target)) {
          container.parentElement.scrollLeft = container.scrollWidth - container.clientWidth;
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
    this.movies.openFullscreen(video);
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
}
