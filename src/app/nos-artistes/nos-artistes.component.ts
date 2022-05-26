import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from '../shared/services/youtube.service';

@Component({
  selector: 'app-nos-artistes',
  templateUrl: './nos-artistes.component.html',
  styleUrls: ['./nos-artistes.component.scss']
})
export class NosArtistesComponent implements OnInit {

  urls: Array<SafeResourceUrl> = new Array();

  constructor(
    private youtubeService: YoutubeService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.youtubeService.getVideos().subscribe( data => {
      Object.keys(data.items).forEach(key => {
        if(data.items[key].id.videoId){
          const url = this.sanitizer.bypassSecurityTrustResourceUrl("//www.youtube.com/embed/"+data.items[key].id.videoId);
          this.urls.push(url);
        }
    });
    })
  }

}
