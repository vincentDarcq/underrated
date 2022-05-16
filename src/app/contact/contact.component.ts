import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  nom: string;
  prenom: string;
  mail: string;
  phone: string;
  sujet: string;
  message: string;

  constructor() { }

  ngOnInit(): void {
  }

  sendMail(){
    console.log("sent")
  }

}
