import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';
import { SNACKBAR_DURATION } from '../../../models/constants';
import { RobotDefinition } from '../../../models/robot-definition';
import { RobotDefinitionsService } from '../../../services/robot-definitions.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  templateUrl: 'robots-browse.component.html',
  styleUrls: ['./robots-browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RobotsBrowseComponent implements OnInit {
  readonly datasource: string[] = ['name', 'actions'];
  model$!: Observable<RobotDefinition[]>;
  reload$ = new BehaviorSubject(null);;
  constructor(private service: RobotDefinitionsService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.model$ = this.reload$.pipe(switchMapTo(this.service.getAll()));
  }

  delete(id: string, name: string) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `¿Desea eliminar el robot ${name}?`
      })
      .afterClosed()
      .subscribe((confirmed: Boolean) => {
        if (!confirmed) {
          return;
        }

        this.service.delete(id).subscribe(() => {
          this.snackBar.open('Eliminado correctamente', undefined, { duration: SNACKBAR_DURATION })
          this.reload$.next(null);
        });
      });
  }
}
