import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  roomNumber: Number = 0;
  constructor(private router:Router) {  }

  ngOnInit() {
  }

  sendRequest() {
    this.roomNumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000)
    var url = "whatsapp://send?text=http://gamestictactoe.herokuapp.com/gameroom?room="+this.roomNumber;
    window.open(url,"_blank")
    this.router.navigate(['gameroom'], { queryParams: { room: this.roomNumber } });
  }
}

// "whatsapp://send?text=<<HERE GOES THE URL ENCODED TEXT YOU WANT TO SHARE>>" data-action="share/whatsapp/share"
