import { User } from "./user";

export class ResponseWinner{
    id:number;
    draw:string;
    user:User;
    winningTicket:string;
    prize:string;
    sessionId:number;
}