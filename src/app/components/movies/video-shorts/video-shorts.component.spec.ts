import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoShortsComponent } from './video-shorts.component';

describe('VideoShortsComponent', () => {
  let component: VideoShortsComponent;
  let fixture: ComponentFixture<VideoShortsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoShortsComponent]
    });
    fixture = TestBed.createComponent(VideoShortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
