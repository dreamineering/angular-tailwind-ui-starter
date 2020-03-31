import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button [class]="getStyles()">{{text}}</button>
  `,
})

export class ButtonComponent implements OnInit {

  @Input() type = 'simple';
  @Input() color = 'teal';
  @Input() text: string;
  constructor() { }

  ngOnInit() {
  }

  getStyles() {
    switch (this.type) {
      case 'simple':
        return `bg-${this.color}-500 hover:bg-${this.color}-700 text-white font-bold py-2 px-4 rounded mb-2 border border-${this.color} mx-2`
      case 'outline':
        return `hover:bg-${this.color}-500 text-${this.color}-700 font-semibold hover:text-white py-2 px-4 border border-${this.color}-500 hover:border-transparent rounded mb-2 mx-2`
    }
  }

}
