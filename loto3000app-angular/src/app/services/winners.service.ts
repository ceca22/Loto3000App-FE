import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseWinner } from '../models/responseWinner';

@Injectable({
  providedIn: 'root'
})
export class WinnersService {

  findWinnersStatusSubject$:Subject<boolean> = new Subject();

  private winnersBoardSubject = new BehaviorSubject<ResponseWinner[]>([]);
  winnersBoardObservableObservable = this.winnersBoardSubject.asObservable();

  readonly baseUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient,
    private router:Router) { }


  getWinners(){
    this.http
    .get<ResponseWinner[]>(`${this.baseUrl}/winning/board`)
    .subscribe(
      (payload:any) => {
        // console.log("winners" + JSON.stringify(payload));
            this.winnersBoardSubject.next(payload);
          }, (error) => 
          { console.log(error);
        }
    )
  }

  findWinners(){
    this.http
    .get(`${this.baseUrl}/winning/findwinners`)
    .subscribe(
      (payload:any) => {;
            console.log("find winners: " + payload);
            this.findWinnersStatusSubject$.next(payload);
          }, (error) => 
          { console.log(error);
        }
    )
  }


  refresh(): void {
    window.location.reload();
  }


}
