import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RobotsBrowseComponent } from './robot/robots-browse.component';
import { RobotsEditComponent } from './robot/robots-edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'robots/browse', component: RobotsBrowseComponent },
  { path: 'robots/new', component: RobotsEditComponent },
  { path: 'robots/edit/:id', component: RobotsEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
