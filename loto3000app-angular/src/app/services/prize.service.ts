import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prize } from '../models/prize';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {

  prizesAvailableSubject$:Subject<Prize[]> = new Subject();

  constructor(private http:HttpClient,
    private router:Router) { }

  readonly baseUrl = environment.apiBaseUrl;

  getPrizes(){
    this.http
    .get<Prize[]>(`${this.baseUrl}/prize`)
    .subscribe(
      (payload:any) => {
        console.log("prizes available" + payload);

        this.prizesAvailableSubject$.next(payload);
            
            
        }, (error) => 
        { console.log(error);
      }
    )
  }

}
