import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../shared/services/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  active: String;
  activeHeaderSub: Subscription;

  constructor(
    private headerService: HeaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activeHeaderSub = this.headerService.activeHeader.subscribe((header: string) => {
      this.active = header;
    })
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
