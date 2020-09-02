import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlocksComponent } from './blocks/blocks.component';
import { SourceViewerComponent } from './source-viewer/source-viewer.component';




@NgModule({
  declarations: [BlocksComponent, SourceViewerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BlocksComponent,
    SourceViewerComponent
  ]
})
export class BlocklyRobocodeModule { }
