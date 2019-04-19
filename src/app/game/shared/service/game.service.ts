import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Question } from 'src/app/shared/models/question';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private socket: Socket) { }

  getUsers() {
    return this.socket.fromEvent('users');
  }

  askForQuestion() {
    this.socket.emit('question', 'get new question');
  }

  receiveQuestion() {
    return this.socket.fromEvent('question');
  }

}
