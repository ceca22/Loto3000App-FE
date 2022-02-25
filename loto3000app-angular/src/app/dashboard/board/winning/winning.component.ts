import { Component, Input, OnInit, Output } from '@angular/core';
import { ResponseWinner } from 'src/app/models/responseWinner';
import { Winning } from 'src/app/models/winning';

@Component({
  selector: 'app-winning',
  templateUrl: './winning.component.html',
  styleUrls: ['./winning.component.css']
})
export class WinningComponent implements OnInit {

  @Input() winning:ResponseWinner;
  

  constructor() { }

  ngOnInit(): void {
  }

  
}
