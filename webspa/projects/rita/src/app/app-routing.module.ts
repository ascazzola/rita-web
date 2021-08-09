import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core';
import { AppContainerComponent } from './modules/main/app-container/app-container.component';


const routes: Routes = [
  {
    path: '',
    component: AppContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/main/main.module').then(mod => mod.MainModule)
      },
      {
        path: 'battles',
        loadChildren: () => import('./modules/battle/battle.module').then(mod => mod.BattleModule)
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
