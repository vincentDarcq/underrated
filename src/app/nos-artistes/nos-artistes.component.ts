import { Component, OnDestroy, OnInit } from '@angular/core';
import { Artiste } from '../shared/models/artiste';
import { NosArtistesService } from '../shared/services/nos-artistes.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nos-artistes',
  templateUrl: './nos-artistes.component.html',
  styleUrls: ['./nos-artistes.component.scss']
})
export class NosArtistesComponent implements OnInit, OnDestroy {
  artistes: Array<Artiste>;
  serverImg: String = "/upload?img=";
  customOptions: OwlOptions;
  subscription: Subscription = new Subscription();

  constructor(
    private nosArtistesServices: NosArtistesService
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
      autoplay: true,
      autoplayTimeout: 4000
    }
    this.subscription.add(
      this.nosArtistesServices.artistes.subscribe( (artistes: Array<Artiste>) => {
        this.artistes = artistes;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
