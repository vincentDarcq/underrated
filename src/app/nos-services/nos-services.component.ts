import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NosServicesService } from '../shared/services/nos-services.service';
import { Service } from '../shared/models/services';
import { Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-nos-services',
  templateUrl: './nos-services.component.html',
  styleUrls: ['./nos-services.component.scss']
})
export class NosServicesComponent implements OnInit {

  titre: string;
  paragraphe: string;
  creation: Subscription;
  services: Array<Service>;
  serverImg: String = "/upload?img=";
  customOptions: OwlOptions;

  @Output() height = new EventEmitter();

  constructor(
    private nosServicesService: NosServicesService
  ) {
  }
  
  ngOnInit(): void {
    this.customOptions = {
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 600,
      navText: ['<i class="fas fa-angle-left fa-2x"></i>', '<i class="fas fa-angle-right fa-2x"></i>'],
      responsive: {
        1000: {
          items: 1
        }
      },
      nav: true,
      loop: true,
      // autoplay: true,
      //autoplayTimeout: 8000
    }
    this.nosServicesService.getServices().then( (services: Array<Service>) => {
      this.services = services;
    })
  }
}
