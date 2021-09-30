import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RobotDefinition } from '../../../models/robot-definition';
import { RobotDefinitionsService } from '../../../services/robot-definitions.service';

@Component({
  templateUrl: 'robots-browse.component.html',
  styleUrls: ['./robots-browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RobotsBrowseComponent implements OnInit {
  readonly datasource: string[] = ['name', 'actions'];
  model$!: Observable<RobotDefinition[]>;
  constructor(private service: RobotDefinitionsService) { }

  ngOnInit() {
    this.model$ = this.service.getAll();
  }
}
