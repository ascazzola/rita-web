import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxRobocodeBlocklyModule } from 'projects/ngx-robocode-blockly/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxRobocodeBlocklyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
