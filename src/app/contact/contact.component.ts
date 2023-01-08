import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { ContactService } from '../shared/services/contact.service';

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
  contactSub: Subscription;
  form: FormGroup;
  success: boolean = false;
  time: Subscription;

  @Output() height = new EventEmitter();

  @ViewChild('component')
  component: ElementRef;

  constructor(
    private contact: ContactService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: [''],
      objet: ['', Validators.required],
      mail: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.height.emit(this.component.nativeElement.offsetHeight);
  }

  sendMail(){
    this.contactSub = this.contact.sendMail(this.form.value).subscribe( result => {
      if(result == "mail envoyé"){
        console.log(result)
        this.success = true;
        this.time = this.timerPage();
      }
    })
  }

  public timerPage(){
    return timer(5000).subscribe(() => {
      this.success = false;
      this.time.unsubscribe();
    })
  }

}
