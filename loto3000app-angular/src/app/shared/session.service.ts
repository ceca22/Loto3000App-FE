import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Session } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  currentSession:Session;
  status$ = new Subject<boolean>();
  sessionSubject$ = new Subject<Session>();


  constructor(private http:HttpClient, private router:Router) { }

  readonly baseUrl = environment.apiBaseUrl;

  ngOnInit(): void {

  }

  getCurrentSession(){
    this.http
    .get<Session>(`${this.baseUrl}/session/info`)
    .subscribe((response) => {
      
      this.sessionSubject$.next(response);
      this.currentSession = response;
      console.log("currentSession" + this.currentSession);
    },(error) => {
      console.log(error);
    }
    )
  }


  getSessionId():string|null{
    if(this.currentSession != null){
      return this.currentSession.id.toString();
    }
    return null;
  }

  sessionStatus(){
    this.http
    .get<boolean>(`${this.baseUrl}/session/status`)
    .subscribe((response) => {
      console.log("status: " + response);
      this.status$.next(response);
      
    },(error) => {
      console.log(error);
    }
    )
  }

  start(){
    this.http
    .post(`${this.baseUrl}/session/start`, {}, {responseType:'text'})
    .subscribe((response) => {
      console.log("start session: " + response);
      this.router.navigate(['dashboard/tickets']);
      this.refresh();

      
    },(error) => {
      console.log(error);
    }
    )
  }


  end(){
    this.http
    .post(`${this.baseUrl}/session/end`, {}, {responseType:'text'})
    .subscribe((response) => {
      console.log("end session: " + response);
      this.router.navigate(['dashboard/tickets']);
      this.refresh();
      
      
    },(error) => {
      console.log(error);
    }
    )
  }

  refresh(): void {
    window.location.reload();
}

}
