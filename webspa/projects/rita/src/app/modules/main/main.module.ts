import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from './app-bar/app-bar.component';
import { RobotsEditComponent } from './robot/robots-edit.component';
import { MainRoutingModule } from './main-routing.module';
import { AppContainerComponent } from './app-container/app-container.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { BattleModule } from '../battle/battle.module';

@NgModule({
  declarations: [
    AppContainerComponent,
    AppBarComponent,
    HomeComponent,
    AppContainerComponent,
    HomeComponent,
    RobotsEditComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MainRoutingModule,
    SharedModule,
    BattleModule
  ]
})
export class MainModule { }
