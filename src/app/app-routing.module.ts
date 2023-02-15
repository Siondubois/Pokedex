import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/un-auth.guard';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { HomeComponent } from './pages/home/home.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { SigninComponent } from './pages/signin/signin.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '',
    component: HomeComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'pokedex/:page',
    component: PokedexComponent,
  },
  {
    canActivate: [UnAuthGuard],
    path:'login',
    component: ConnexionComponent,
  },
  {
    canActivate: [UnAuthGuard],
    path:'signup',
    component: SigninComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
