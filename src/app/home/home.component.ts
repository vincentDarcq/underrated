import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  phrase: string[] = ["On est jamais aussi redoutables que lorsqu'on est sous estimés."];
  speed: number = 30;

  constructor() { }

  ngOnInit(): void {
  }

}
