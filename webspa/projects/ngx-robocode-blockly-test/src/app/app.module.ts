import { NgxResizableModule } from '@3dgenomes/ngx-resizable';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
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
    FormsModule,
    ReactiveFormsModule,
    NgxRobocodeBlocklyModule,
    MonacoEditorModule,
    NgxResizableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
