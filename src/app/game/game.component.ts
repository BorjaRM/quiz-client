import { Component, OnInit } from '@angular/core';
import { GameService } from './shared/service/game.service';
import { Question } from '../shared/models/question';

@Component({
  selector: 'app-home',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public connectedUsers = 0;
  public question: Question;
  public questions: Question[] = [];
  public gameIsStarted = false;
  public remainingTime: number;
  public timerEnded = false;

  constructor(private gameService: GameService) {

  }

  ngOnInit() {

    this.gameService.getUsers().subscribe((users: number) => {
      this.connectedUsers = users;
    });

    this.gameService.receiveQuestion().subscribe((q: Question) => {
      console.log(q);
      this.question = q;
      this.questions.push(q);
    });

  }

  startGame() {
    this.gameService.askForQuestion();

    this.gameIsStarted = true;
    console.log('empieza el juego');
    this.startCountdown(3);
  }

  startCountdown(seconds) {
    this.remainingTime = seconds;
    const interval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0 ) {
        // The code here will run when
        // the timer has reached zero.
        this.timerEnded = true;
        this.gameIsStarted = false;
        clearInterval(interval);
      }
    }, 1000);
  }


}
