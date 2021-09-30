import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ThemeService, Theme } from '../../../services/theme.service';
@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppContainerComponent implements OnInit {
  toggleControl = new FormControl(false);

  constructor(private themeService: ThemeService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    const toogle$ = this.toggleControl.valueChanges.pipe(map(x => x ? Theme.Dark : Theme.Light));
    const preferredTheme$ = this.themeService.preferredTheme$.pipe(
      tap(x => this.toggleControl.setValue(x == Theme.Dark)));

    merge(preferredTheme$, toogle$)
      .subscribe(x => {
        this.themeService.changeTheme(x);
        this.changeDetector.detectChanges();
      });
  }

  logout() {

  }

}
