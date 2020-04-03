import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  messages: Array<string> = [];
  gameArray: Array<string> = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
  remainingGame = 5;
  gameRoom: any = null;

  user: string = '';
  friend: string = '';

  userTurn: boolean = false;
  friendTurn: boolean = false;

  userWins: number = 0;
  friendWins: number = 0;
  draws: number = 0;

  winner: string = null;
  overlay: boolean = false;
  backBtn: boolean = false;
  friendLeft: boolean = false;
  serverError: boolean = false;

  showInput: boolean = false;
  textMsg: string = "";
  friendJoined: boolean = false;

  socket: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.gameRoom = params['room'];
      if (!this.gameRoom) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {

    this.socket = io('/');

    // client socket.io initialization
    this.socket.on('connect', () => {
      // console.log("connection made");
      this.socket.emit("joinRoom", { room: this.gameRoom });
    });
    this.socket.on('connect_error', () => {
      this.overlay = true;
      this.serverError = true;
    });

    this.socket.on('userJoined', (data) => {
      if (data.userJoined) {
        this.user = 'x';
        this.friend = 'o';
        this.userTurn = true;
        this.friendTurn = false;
      }
    });
    this.socket.on('friendJoined', (data) => {
      this.friendJoined = true;
      if (this.user === '' && this.friend === '') {
        if (data.friendJoined) {
          this.user = 'o';
          this.friend = 'x';
          this.userTurn = false;
          this.friendTurn = true;
        }
      }
    });

    this.socket.on('gameArr', (data) => {
      if (data) {
        this.gameArray = data.gameArray;
        this.checkWinner();
      }
      else {
      }
    });

    this.socket.on('message', (data) => {
      if (data) {
        this.messages.push(data.message);
        setTimeout(() => {
          this.messages.shift();
        }, 5000);
      }
      else {
      }
    });

    this.socket.on('friendLeft', (data) => {
      if (data.friendLeft) {
        this.overlay = true;
        this.friendLeft = true;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      }
      else {
      }
    });

  }

  cellClicked(cell) {
    if (this.gameArray[cell] === 'e' && this.userTurn && this.friendJoined) {
      this.gameArray[cell] = this.user;
      this.socket.emit('gameArray', {
        room: this.gameRoom,
        gameArray: this.gameArray
      });
      this.checkWinner();
    }
  }



  checkWinner() {
    var winner = this.winningLogic();
    if (winner) {
      if (winner === this.user) {
        this.userWins++;
        this.remainingGame--;
        if (!this.checkRemainingGames()) {
          this.gameArray = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
        }
        return;
      }
      if (winner === this.friend) {
        this.friendWins++;
        this.remainingGame--;
        if (!this.checkRemainingGames()) {
          this.gameArray = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
        }
        return;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (this.gameArray[i] === 'e') {
        this.userTurn = this.friendTurn;
        this.friendTurn = !this.userTurn;
        return;
      }
    }
    this.draws++;
    this.remainingGame--;
    if (!this.checkRemainingGames()) {
      this.gameArray = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
    }
  }

  checkRemainingGames() {
    if (this.remainingGame <= 0) {
      if (this.userWins > this.friendWins) {
        this.overlay = true;
        this.winner = this.user;
        return true;
      }
      if (this.userWins < this.friendWins) {
        this.overlay = true;
        this.winner = this.friend;
        return true;
      }
      if (this.userWins == this.friendWins) {
        this.overlay = true;
        this.winner = 'd';
        return true;
      }
    } else {

    }
  }

  winningLogic() {
    // horizontal checking
    if (this.gameArray[0] !== 'e' && this.gameArray[0] === this.gameArray[1] && this.gameArray[1] === this.gameArray[2]) {
      return this.gameArray[0];
    }
    if (this.gameArray[3] !== 'e' && this.gameArray[3] === this.gameArray[4] && this.gameArray[4] === this.gameArray[5]) {
      return this.gameArray[3];
    }
    if (this.gameArray[6] !== 'e' && this.gameArray[6] === this.gameArray[7] && this.gameArray[7] === this.gameArray[8]) {
      return this.gameArray[6];
    }
    // vertical checking
    if (this.gameArray[0] !== 'e' && this.gameArray[0] === this.gameArray[3] && this.gameArray[3] === this.gameArray[6]) {
      return this.gameArray[0];
    }
    if (this.gameArray[1] !== 'e' && this.gameArray[1] === this.gameArray[4] && this.gameArray[4] === this.gameArray[7]) {
      return this.gameArray[1];
    }
    if (this.gameArray[2] !== 'e' && this.gameArray[2] === this.gameArray[5] && this.gameArray[5] === this.gameArray[8]) {
      return this.gameArray[2];
    }
    // diagonal checking
    if (this.gameArray[0] !== 'e' && this.gameArray[0] === this.gameArray[4] && this.gameArray[4] === this.gameArray[8]) {
      return this.gameArray[0];
    }
    if (this.gameArray[2] !== 'e' && this.gameArray[2] === this.gameArray[4] && this.gameArray[4] === this.gameArray[6]) {
      return this.gameArray[2];
    }
  }

  sendMsg() {
    this.showInput = !this.showInput;
    if(this.textMsg.trim().length > 0){
      this.socket.emit('textMsg', {
        room: this.gameRoom,
        message: this.textMsg
      });
    }
    this.textMsg = "";
  }

  goToHome() {
    this.socket.emit('leavingRoom', {
      room: this.gameRoom
    });
    this.router.navigate(['/']);
  }

  restart() {
    this.remainingGame = 5;
    this.gameArray = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
    this.winner = null;
    this.overlay = false;
    this.userWins = 0;
    this.friendWins = 0;
    this.draws = 0;
  }

}
