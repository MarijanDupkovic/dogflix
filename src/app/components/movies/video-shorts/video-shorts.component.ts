import { AfterViewInit, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MoviesComponent } from '../movies.component';
@Component({
  selector: 'app-video-shorts',
  templateUrl: './video-shorts.component.html',
  styleUrls: ['./video-shorts.component.scss']
})
export class VideoShortsComponent implements AfterViewInit {
  public error: string = '';
  date = new Date().toLocaleDateString();
  sIsHidden = false;
  active: string = '';
  active_video: string = '';
  solutionChange: boolean = false;
  solution: string = '480p';
  constructor(public movies: MoviesComponent) { }

  async ngAfterViewInit() {

    this.resetActiveVideo();
    document.getElementById('movies')!.addEventListener('mouseover', (e) => {
      const container: any = document.getElementById('sContainer');
      const target = e.target as HTMLElement;
      if (this.movies.videos_loaded && container.children[container.children.length - 2].contains(target)) {
        container.parentElement.scrollLeft = container.scrollWidth - container.clientWidth;
      }
    });

    addEventListener('fullscreenchange', (e) => {
      if (!document.fullscreenElement && this.active_video.length > 0) {
        this.active = this.active_video;
        this.active_video = '';
        this.sIsHidden = true;
      }
    }
    );
  }

  startVideo(id: number) {
    let video: any = document.getElementById('sVideoPlayer' + id);
    let playButton: any = document.getElementById('sPlayButton' + id);
    let pauseButton: any = document.getElementById('sPauseButton' + id);
    playButton.classList.add('d-none');
    pauseButton.classList.remove('d-none');
    this.sIsHidden = false;
    this.movies.openFullscreen(video);
    this.active_video = id.toString();
    this.active = '';
    video.play();
  }

  pauseVideo(id: number) {
    let video: any = document.getElementById('sVideoPlayer' + id);
    let playButton: any = document.getElementById('sPlayButton' + id);
    let pauseButton: any = document.getElementById('sPauseButton' + id);
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
        const videoPlayer = document.getElementById('sVideoPlayer' + this.active);
        if (videoPlayer && !videoPlayer.contains(target) && this.sIsHidden) {
          this.active_video = '';
          this.active = '';
          this.sIsHidden = false;
        }
      }
    });
  }

  playerFormatChange(video: string, path: string, id: number) {
    let videoSource: any = document.getElementById('sVideoSource' + id);
    let videoContainer: any = document.getElementById('sVideoPlayer' + id);
    let newPath = path.split('/');
    newPath.splice(0, 3);
    videoSource.src = environment.baseUrl + '/' + newPath[0] + '/' + newPath[1] + '/' + newPath[2];
    this.solutionChange = !this.solutionChange;
    this.solution = video;
    videoContainer.load();
  }

}
