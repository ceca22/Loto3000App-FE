import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoComponent } from './dashboard/info/info.component';
import { TicketComponent } from './dashboard/ticket/ticket.component';
import { TicketsComponent } from './dashboard/tickets/tickets.component';
import { BoardComponent } from './dashboard/board/board.component';
import { AuthGuard } from './guards/auth-guard';
import { JwtModule } from '@auth0/angular-jwt';
import { CardComponent } from './dashboard/tickets/card/card.component';
import { SharedDataService } from './shared/shared-data.service';
import { CardTemplateComponent } from './dashboard/ticket/card-template/card-template.component';
import { ImageInfoComponent } from './image-container/image-info/image-info.component';
import { WinningComponent } from './dashboard/board/winning/winning.component';


export function tokenGetter(){
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    InfoComponent,
    TicketComponent,
    TicketsComponent,
    BoardComponent,
    CardComponent,
    CardTemplateComponent,
    ImageInfoComponent,
    WinningComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    

    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        allowedDomains:["localhost:7789"],
        disallowedRoutes: []
      }
    })
  ],
  providers:[AuthGuard,SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
