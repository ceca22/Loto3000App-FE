import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  giftCardFifty:number;
  giftCardHundred:number;
  car:number;
  vacation:number;
  tv:number;

  

  constructor() { }

  ngOnInit(): void {
  }

}
