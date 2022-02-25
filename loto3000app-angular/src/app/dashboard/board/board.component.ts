import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponseWinner } from 'src/app/models/responseWinner';
import { DrawService } from 'src/app/services/draw.service';
import { PrizeService } from 'src/app/services/prize.service';
import { WinnersService } from 'src/app/services/winners.service';

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
  draw:string;
  drawSubscription:Subscription;
  sessionId:number[];
  winningsSubscription:Subscription;
  winners:ResponseWinner[] = [];

  constructor(private winnersService:WinnersService,
    private drawService:DrawService) { }

  ngOnInit(): void {
    this.winnersService.getWinners();
    this.winnersService.winnersBoardObservableObservable
    .subscribe(message => this.winners = message);
    this.drawService.getLastDraw();
    this.initSubscriptionsDraw();

  }

  
  initSubscriptionsDraw(){
    this.drawSubscription = this.drawService.lastDraw$
  .subscribe(
    (payload:string) => {
      this.draw = payload;
    }
  )
  
  }
  
  
}
