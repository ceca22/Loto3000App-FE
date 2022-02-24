import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './app/dashboard/board/board.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { InfoComponent } from './app/dashboard/info/info.component';
import { TicketComponent } from './app/dashboard/ticket/ticket.component';
import { TicketsComponent } from './app/dashboard/tickets/tickets.component';
import { AuthGuard } from './app/guards/auth-guard';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';


const routes: Routes = [
    {path:'', redirectTo:'login' , pathMatch:'full'},
    { path:'login', component:LoginComponent},
    { path:'dashboard', component:DashboardComponent,
    children:[
    { path:'info', component:InfoComponent, canActivate: [AuthGuard]},
    { path:'ticket',component:TicketComponent},
    { path:'tickets', component: TicketsComponent},
    { path:'board', component: BoardComponent},

    ]},
    {path:'login/register', component:RegisterComponent},
    
    
];


@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule {

}