import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'login',
    component: ConnexionComponent,
  },
  {
    path:'signin',
    component: SigninComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
