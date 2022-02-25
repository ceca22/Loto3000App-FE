import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  drawStatus$ = new Subject<boolean>();
  lastDraw$ = new Subject<string>();

  constructor(private http:HttpClient,
    private router:Router) { }

  readonly baseUrl = environment.apiBaseUrl;

  drawIsMade(){
    this.http
    .get<boolean>(`${this.baseUrl}/draw/drawStatus`, )
    .subscribe((response) => {
      console.log("draw is made: " + response);
      this.drawStatus$.next(response);
      
    },(error) => {
      console.log(error);
    })
  }

  draw(){
    this.http
    .post(`${this.baseUrl}/draw/start`, {}, {responseType:'text'})
    .subscribe((response) => {
      console.log("make a draw: " + response);
      this.router.navigate(['dashboard/tickets']);
      this.refresh();
    },(error) => {
      console.log(error);
    }
    )
  }

  getLastDraw(){
    this.http
    .get<string>(`${this.baseUrl}/draw/last`, {responseType: 'text' as 'json'})
    .subscribe((response:string) => {
      console.log("last draw: " + response);
      this.lastDraw$.next(response);
    },(error) => {
      console.log(error);
    }
    )
  }


  refresh(): void {
    window.location.reload();
  }

}
