import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artiste } from '../shared/models/artiste';
import { NosArtistesService } from '../shared/services/nos-artistes.service';

@Component({
  selector: 'app-nos-artistes',
  templateUrl: './nos-artistes.component.html',
  styleUrls: ['./nos-artistes.component.scss']
})
export class NosArtistesComponent implements OnInit, AfterViewInit {

  getAll: Subscription;
  artistes: Array<Artiste>;
  serverImg: String = "/upload?img=";

  @Output() height = new EventEmitter();

  @ViewChild('component')
  component: ElementRef;

  constructor(
    private nosArtistesServices: NosArtistesService
  ) { }

  ngOnInit(): void {
    this.getAll = this.nosArtistesServices.artistes.subscribe( (artistes: Array<Artiste>) => {
      this.artistes = artistes;
    })
  }

  ngAfterViewInit(): void {
    this.height.emit(this.component.nativeElement.offsetHeight);
  }

}
