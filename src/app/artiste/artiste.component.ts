import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtistePage } from '../shared/models/artistePage';
import { ArtistePageService } from '../shared/services/artiste-page.service';

@Component({
  selector: 'app-artiste',
  templateUrl: './artiste.component.html',
  styleUrls: ['./artiste.component.scss']
})
export class ArtisteComponent implements OnInit {

  getPage: Subscription;
  page: ArtistePage;
  serverImg: String = "/upload?img=";
  artiste: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private artistePageService: ArtistePageService,
  ) { 
  }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.artiste = params.get('artiste');
      this.getPage = this.artistePageService.getPage(params.get('artiste')).subscribe( (artistePage: ArtistePage) => {
        this.page = artistePage;
      })
    });
  }
  
  listen(url: string){
    window.open(url);
  }
  
}

// let videos = new Array();
// for(let video of artistePage[0].videos){
//   const url = this.sanitizer.bypassSecurityTrustResourceUrl("//www.youtube.com/embed/"+video);
//   videos.push(url);
// }
// artistePage[0].videos = videos;