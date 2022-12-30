import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NosServicesService } from '../shared/services/nos-services.service';
import { Service } from '../shared/models/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nos-services',
  templateUrl: './nos-services.component.html',
  styleUrls: ['./nos-services.component.scss']
})
export class NosServicesComponent implements OnInit, OnDestroy, AfterViewInit {

  titre: string;
  paragraphe: string;
  creation: Subscription;
  getAll: Subscription;
  services: Array<Service>;

  @Output() height = new EventEmitter();

  @ViewChild('component')
  component: ElementRef;

  constructor(
    private nosServicesService: NosServicesService
  ) { 
    this.services = new Array();
  }
  
  ngOnInit(): void {
    this.getAll = this.nosServicesService.services.subscribe( (services: Array<Service>) => {
      this.services = services;
    })
  }

  ngAfterViewInit(): void {
    this.height.emit(this.component.nativeElement.offsetHeight);
  }
  
  public createService(){
    const service = new Service(this.titre, this.paragraphe);
    this.nosServicesService.createService(service)
  }

  ngOnDestroy(): void {
    if(this.creation){this.creation.unsubscribe();}
    if(this.getAll){this.getAll.unsubscribe();}
  }

}
