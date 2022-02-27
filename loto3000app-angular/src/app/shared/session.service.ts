import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  openSession$ = new Subject<boolean>();
  closeSession$ = new Subject<boolean>();


  constructor(private http:HttpClient, 
    private router:Router,
    private toastr:ToastrService) { }

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
      console.log("session status: " + response);
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
      this.router.navigate(['dashboard/tickets']);
      this.openSession$.next(true);
      this.refresh();
    },(error) => {
      console.log(error);
      this.toastr.error(error.error);

    }
    )
  }


  end(){
    this.http
    .post(`${this.baseUrl}/session/end`, {}, {responseType:'text'})
    .subscribe((response) => {
      console.log("end session: " + JSON.stringify(response));
      this.router.navigate(['dashboard/tickets']);
      this.closeSession$.next(true);
      this.refresh();
    },(error) => {
      console.log(error);
      this.toastr.error(error.error);

    }
    )
  }

  refresh(): void {
    window.location.reload();
}

}
