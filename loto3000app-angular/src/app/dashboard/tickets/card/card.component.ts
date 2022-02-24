import { Component, Input, OnInit } from '@angular/core';
import { TicketCombination } from 'src/app/models/ticketCombination';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() ticket: TicketCombination;

  constructor() { }

  ngOnInit(): void {
  }

}
