import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFilmsComponent } from './video-films.component';

describe('VideoFilmsComponent', () => {
  let component: VideoFilmsComponent;
  let fixture: ComponentFixture<VideoFilmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoFilmsComponent]
    });
    fixture = TestBed.createComponent(VideoFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
