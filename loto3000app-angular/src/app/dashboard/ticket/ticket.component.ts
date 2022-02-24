import { Component,OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/models/ticket';
import { TicketCombination } from 'src/app/models/ticketCombination';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';
import { SessionService } from 'src/app/shared/session.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  currentUserInfo:User;

  ticketsSubscriptions:Subscription;
  userEnrolledSubscriptions:Subscription;
  ticketsForCurrentSession:TicketCombination[] = [];
  ticketCount:number;
  userCount:number;

  ticketForm:FormGroup;


  constructor(private sharedData:SharedDataService,
    private ticketService:TicketService,
    private sessionService:SessionService,
    private auth:AuthService) { }

  ngOnInit(): void {
    this.sessionService.getCurrentSession();
    this.sharedData.currentUserObservable.subscribe(message => this.currentUserInfo = message);
    this.sharedData.initSubscriptionsCurrentUser();
    this.ticketService.getUserCount();
    this.ticketService.getTickets();
    this.initSubscriptions();
    

  }

  initSubscriptions(){
    this.ticketsSubscriptions = this.ticketService.ticketsForCurrentSessionSubject$.subscribe(
      (payload:TicketCombination[]) => {
        console.log("ticketsForCurrentSession: " + payload.length)
        this.ticketsForCurrentSession = payload;
        this.ticketCount = payload.length;
      }
    )

    this.userEnrolledSubscriptions = this.ticketService.userEnrolledSubject$.subscribe(
      (payload:number) => {
        this.userCount = payload;
      }
    )
  }

  onSubmitTicket(form:NgForm){
    console.log("form:" + JSON.stringify(form.value));
    const data:Ticket = form.value;
    console.log("data:" + JSON.stringify(data));

    const userId = this.auth.getUserId();
    if(userId != null){
      data.userId = userId;
    }
    const sessionId = this.sessionService.getSessionId();
    if(sessionId != null){
      data.sessionId = sessionId;
    }
    this.ticketService.submitTicket(data);
  }


}
