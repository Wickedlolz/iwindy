import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface IMessage {
  text: string;
  type: MessageType;
}

export enum MessageType {
  Success,
  Error,
}

@Injectable({
  providedIn: 'root',
})
export class MessageBusService {
  private message$ = new Subject<IMessage | undefined>();

  onNewMessage$ = this.message$.asObservable();

  constructor() {}

  notifyForMessage(message: IMessage) {
    this.message$.next(message);
  }

  clear(): void {
    this.message$.next(undefined);
  }
}
