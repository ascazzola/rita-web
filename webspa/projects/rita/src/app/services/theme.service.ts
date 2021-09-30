import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { ReplaySubject } from "rxjs";

const darkModeMediaQuery = '(prefers-color-scheme: dark)';

export enum Theme { Light = 'light-theme', Dark = 'dark-theme' }

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  preferredTheme$ = new ReplaySubject<Theme>();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    const darkModeOn =
      window.matchMedia &&
      window.matchMedia(darkModeMediaQuery).matches;

    this.preferredTheme$.next(darkModeOn ? Theme.Dark : Theme.Light);

    window.matchMedia(darkModeMediaQuery).onchange = (e => {
      const darkModeOn = e.matches;
      this.preferredTheme$.next(darkModeOn ? Theme.Dark : Theme.Light);
    });
  }

  changeTheme(theme: Theme): void {
    switch (theme) {
      case Theme.Dark:
        this.renderer.addClass(document.body, Theme.Dark);
        this.renderer.removeClass(document.body, Theme.Light);
        break
      case Theme.Light:
        this.renderer.addClass(document.body, Theme.Light);
        this.renderer.removeClass(document.body, Theme.Dark);
        break
      default: throw `Theme not found ${theme}`;
    }
  }
}
