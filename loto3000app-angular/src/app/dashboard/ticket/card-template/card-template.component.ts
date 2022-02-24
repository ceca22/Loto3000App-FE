import { Component, Input, OnInit } from '@angular/core';
import { TicketCombination } from 'src/app/models/ticketCombination';

@Component({
  selector: 'app-card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.css']
})
export class CardTemplateComponent implements OnInit {

  @Input() ticket: TicketCombination;
  constructor() { }

  ngOnInit(): void {
  }

}
