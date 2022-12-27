import { Component, OnInit } from '@angular/core';
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

  constructor(
    private nosArtistesServices: NosArtistesService
  ) { }

  ngOnInit(): void {
    this.getAll = this.nosArtistesServices.artistes.subscribe( (artistes: Array<Artiste>) => {
      this.artistes = artistes;
    })
  }

}
