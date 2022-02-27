import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/ticket';
import { TicketCombination } from '../models/ticketCombination';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  ticketData:Ticket = new Ticket();
  ticketsSubject$:Subject<TicketCombination[]> = new Subject();
  ticketsForCurrentSessionSubject$:Subject<TicketCombination[]> = new Subject();
  userEnrolledSubject$:Subject<number> = new Subject();


  constructor(private http:HttpClient,
    private router:Router,
    private toastr:ToastrService) {

    }

    readonly baseUrl = environment.apiBaseUrl;
  

  submitTicket(form:Ticket){
    const data: Ticket = {
      sessionId : form.sessionId,
      userId : form.userId,
      one : form.one,
      two : form.two,
      three : form.three,
      four : form.four,
      five : form.five,
      six : form.six,
      seven : form.seven
    };
    //console.log("from service: user:" + data.userId + " session: " + data.sessionId);

    this.http.post<Ticket>(`${this.baseUrl}/ticket`, data, {responseType: 'text' as 'json'})
    .subscribe((response) => {
      //console.log("response" + response);
      this.router.navigate(['dashboard/ticket/manually']);
      this.refresh();
      this.toastr.success("Ticket successfully submited!");
    },
    (error) => {
      console.log(error);
      this.toastr.error(error.error);

    })
    
  }

  getAllTickets(){
    this.http
    .get<TicketCombination[]>(`${this.baseUrl}/ticket/myTickets`)
    .subscribe(
      (payload:any) => {
        //console.log("getting all the tickets" + payload.length)
            this.ticketsSubject$.next(payload);
            console.log(payload);
            
          }, (error) => 
          { console.log(error)
        }
    )
    
  }

  getTickets(){
    this.http
    .get<TicketCombination[]>(`${this.baseUrl}/ticket/tickets`)
    .subscribe(
      (payload:any) => {
            this.ticketsForCurrentSessionSubject$.next(payload);
            //console.log(payload);
            
          }, (error) => 
          { console.log(error);
        }
    )
  }

  getUserCount(){
    this.http
    .get<number>(`${this.baseUrl}/ticket/userCount`)
    .subscribe(
      (payload:any) => {
            this.userEnrolledSubject$.next(payload);
            //console.log(payload);
            
          }, (error) => 
          { console.log(error);
        }
    )
  }

  refresh(): void {
    window.location.reload();
  }

}


  
  





