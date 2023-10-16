import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SiteComponent } from './components/site/site.component';
import { AuthguardService } from './guards/authguard.service';
import { SignupComponent } from './components/signup/signup.component';
import { UserActivationComponent } from './components/user-activation/user-activation.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { DataProtectionComponent } from './components/data-protection/data-protection.component';
import { ShortsComponent } from './components/shorts/shorts.component';
import { FilmsComponent } from './components/films/films.component';
import { NewsComponent } from './components/news/news.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'data-protection', component: DataProtectionComponent },
  { path: 'activate/:token', component: UserActivationComponent },

  {
    path: 'site', component: SiteComponent, canActivate: [AuthguardService],
    children: [
      { path: 'new-films', component: NewsComponent},

      { path: 'videos', component: MoviesComponent },

      { path: 'short-films', component: ShortsComponent },
      { path: 'films', component: FilmsComponent },
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
