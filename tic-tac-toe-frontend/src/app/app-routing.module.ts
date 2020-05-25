import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'Home' } },
  { path: 'gameroom', loadChildren: () => import('./game/game.module').then(m => m.GameModule), data: { animation: 'Game' } },
  { path: "**", pathMatch: "full", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
