import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  roomNumber: Number = 0;
  url: string = "";
  isCopied: boolean = false;
  constructor(private router: Router, private _clipboardService: ClipboardService) { }

  ngOnInit() {

  }


  copyToClipboard() {
    this.isCopied = this._clipboardService.copyFromContent(this.url);
    if (this.isCopied) {
      setTimeout(() => {
        this.isCopied = false;
      }, 5000);
    }
  }

  createRoom() {
    this.roomNumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000)
    this.url = "http://gamestictactoe.herokuapp.com/gameroom?room=" + this.roomNumber;
  }

  sendRequest() {
    // this.roomNumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000)
    // this.url = "whatsapp://send?text=http://gamestictactoe.herokuapp.com/gameroom?room=" + this.roomNumber;
    window.open("whatsapp://send?text="+this.url, "_blank")
    this.router.navigate(['gameroom'], { queryParams: { room: this.roomNumber } });
  }

  startGame(){
    this.router.navigate(['gameroom'], { queryParams: { room: this.roomNumber } });
  }
}
