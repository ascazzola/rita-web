import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-source-viewer',
  templateUrl: './source-viewer.component.html',
  styleUrls: ['./source-viewer.component.scss']
})
export class SourceViewerComponent implements OnInit {

  @Input() sourceCode: string;

  constructor() { }

  ngOnInit() {
  }

}
