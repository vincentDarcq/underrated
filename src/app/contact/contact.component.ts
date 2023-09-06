import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../shared/services/contact.service';
import { InfosService } from '../shared/services/infos.service';

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
  form: FormGroup;

  @Output() height = new EventEmitter();

  @ViewChild('component')
  component: ElementRef;

  constructor(
    private contact: ContactService,
    private fb: FormBuilder,
    private infoServices: InfosService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: [''],
      societe: [''],
      mail: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  async sendMail(){
    await this.contact.sendMail(this.form.value).then( result => {
      if(result == "mail envoyé"){
        this.infoServices.popupInfo('Le message a bien été envoyé !');
      }
    })
  }

}
