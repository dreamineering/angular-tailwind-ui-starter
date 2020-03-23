import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  log(message: string, data: any) {
    this.add(message);
    console.log(message, JSON.stringify(data, null, 2));
  }

  clear() {
    this.messages = [];
  }
}
