import { Component, HostListener, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESC = 27
}

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html'
})
export class AppNavComponent {

  sidebarOpen = false;

  constructor() { }

  // ngOnInit() {
  // }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    const key = event.key || event.keyCode;

    if (key === KEY_CODE.ESC) {
      this.sidebarOpen = false;
    }

    // if (key === KEY_CODE.LEFT_ARROW) {
    //   this.decrement();
    // }
  }

  changeSidebar(state: boolean) {
    this.sidebarOpen = state;
  }


}
