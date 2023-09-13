import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../shared/services/header.service';
import { Router } from '@angular/router';
import { NosArtistesService } from '../shared/services/nos-artistes.service';
import { Artiste } from '../shared/models/artiste';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  active: String;
  subscription: Subscription = new Subscription();
  artistes: Array<Artiste>;

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private nosArtistesService: NosArtistesService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.headerService.activeHeader.subscribe((header: string) => {
        this.active = header;
      })
    )
    this.subscription.add(
      this.nosArtistesService.artistes.subscribe((artistes: Array<Artiste>) => {
        this.artistes = artistes
      })
    )
  }

  activeHeader(header: string){
    this.active = header;
  }

  redirect(page: string){
    this.router.navigate([page]);
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
