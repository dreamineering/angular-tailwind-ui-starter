import { Component, OnInit, HostListener } from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESC = 27
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  sidebarOpen: boolean;

  constructor() { }

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

  ngOnInit() {
  }

}
