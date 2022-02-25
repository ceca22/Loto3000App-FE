import { Component, OnInit, Output } from '@angular/core';
import { Session } from 'src/app/models/session';
import { Subscription } from 'rxjs';
import { TicketCombination } from 'src/app/models/ticketCombination';
import { TicketService } from 'src/app/services/ticket.service';
import { SessionService } from 'src/app/shared/session.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { User } from 'src/app/models/user';
import { DrawService } from 'src/app/services/draw.service';
import { PrizeService } from 'src/app/services/prize.service';
import { Prize } from 'src/app/models/prize';
import { WinnersService } from 'src/app/services/winners.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  tickets:TicketCombination[] = [];
  ticketSubs : Subscription;

  currentSession:Session;
  sessionSubscription:Subscription;

  statusSession:string;
  sessionOpen:boolean;
  sessionClosed:boolean;
  statusSessionSubscription:Subscription;

  currentUserInfo:User;

  drawIsMade:boolean;
  drawSubscription:Subscription;

  announceWinners:boolean = false;
  announceWinnersSubscription:Subscription;

  prizesSubscription:Subscription;
  prizesAvailable:Prize[]=[];

  activeClassPrizes:boolean;
  activeClassTickets:boolean;
  activeClassRules:boolean;
  
  constructor(private ticketService:TicketService, 
    private sessionService:SessionService, 
    private drawService:DrawService,
    private sharedData:SharedDataService,
    private prizeService:PrizeService,
    private winnerService:WinnersService) { }

  ngOnInit(): void {
    this.sharedData.initSubscriptionsCurrentUser();
    this.sharedData.currentUserObservable.subscribe(message => this.currentUserInfo = message);
    this.sessionService.getCurrentSession();
    this.drawService.drawIsMade();
    this.sessionService.sessionStatus();
    this.ticketService.getAllTickets();
    this.ticketService.getTickets();
    this.prizeService.getPrizes();
    this.initSubscriptions();
    this.initSubscriptionsSession();
    this.initSubscriptionsDraw();
    this.initSubscriptionPrize();
    this.initSubscriptionAnnounceWinners();
  }

  initSubscriptions(){
    this.ticketSubs = this.ticketService.ticketsSubject$.subscribe(
      (payload:TicketCombination[]) => {
        console.log("from init:" + payload)
        this.tickets = payload;
      }
    )
  }

  
  initSubscriptionsSession(){
    this.sessionSubscription = this.sessionService.sessionSubject$
    .subscribe(
      (payload:Session) => {
        console.log("session: " + payload);
        this.currentSession = payload;
      }
    )

    this.statusSessionSubscription = this.sessionService.status$
    .subscribe((payload2:boolean) => {
      this.sessionOpen = payload2;
      if(this.sessionOpen)
      this.statusSession = "Currently Open"
      else
      this.statusSession = "Session Closed"

    })
  }


  initSubscriptionsDraw(){
    this.drawSubscription = this.drawService.drawStatus$
  .subscribe(
    (payload:boolean) => {
      console.log("draw" + payload);
      this.drawIsMade = payload;
    }
  )
  
  }

  initSubscriptionPrize(){
    this.prizesSubscription = this.prizeService.prizesAvailableSubject$
    .subscribe((payload:Prize[]) => {
      this.prizesAvailable = payload;
    }
    )
  }

  initSubscriptionAnnounceWinners(){
    this.announceWinnersSubscription = this.winnerService.findWinnersStatusSubject$
    .subscribe((payload:boolean) => {
      console.log("announce winners:" + payload);
      this.announceWinners = payload;
      
    }
    )
  }


  startSession(){
    this.sessionService.start();
  }

  endSession(){
    this.sessionClosed = true;
    this.sessionOpen = false;
    this.sessionService.end();
    
  }

  makeDraw(){
    this.drawService.draw();
  }

  announceWinnersMethod(){
    this.winnerService.findWinners()
  }

  onClickTickets(){
    this.activeClassTickets = !this.activeClassTickets;
  }

  onClickPrizes(){
    this.activeClassPrizes = !this.activeClassPrizes;
  }

  onClickRules(){
    this.activeClassRules = !this.activeClassRules;
  }
}