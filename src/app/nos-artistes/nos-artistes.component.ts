import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artiste } from '../shared/models/artiste';
import { NosArtistesService } from '../shared/services/nos-artistes.service';

@Component({
  selector: 'app-nos-artistes',
  templateUrl: './nos-artistes.component.html',
  styleUrls: ['./nos-artistes.component.scss']
})
export class NosArtistesComponent implements OnInit {

  getAll: Subscription;
  artistes: Array<Artiste>;
  serverImg: String = "/upload?img=";
  responsiveOptions: any[] | undefined;

  @Output() height = new EventEmitter();

  @ViewChild('component')
  component: ElementRef;

  constructor(
    private nosArtistesServices: NosArtistesService
  ) { }

  ngOnInit(): void {
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
    this.getAll = this.nosArtistesServices.artistes.subscribe( (artistes: Array<Artiste>) => {
      this.artistes = artistes;
    })
  }

}
