import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';
import { VideoItemComponent } from './components/movies/video-item/video-item.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { VideoShortsComponent } from './components/movies/video-shorts/video-shorts.component';
import { VideoFilmsComponent } from './components/movies/video-films/video-films.component';
import { SiteComponent } from './components/site/site.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserActivationComponent } from './components/user-activation/user-activation.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { DataProtectionComponent } from './components/data-protection/data-protection.component';
import { ShortsComponent } from './components/shorts/shorts.component';
import { FilmsComponent } from './components/films/films.component';
import { NewsComponent } from './components/news/news.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesComponent,
    VideoItemComponent,
    HeaderComponent,
    FooterComponent,
    VideoShortsComponent,
    VideoFilmsComponent,
    SiteComponent,
    SignupComponent,
    UserActivationComponent,
    LegalNoticeComponent,
    DataProtectionComponent,
    ShortsComponent,
    FilmsComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
