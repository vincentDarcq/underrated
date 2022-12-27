import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeVideo } from '../shared/models/safeVideo';
import { Youtube } from '../shared/models/youtube';
import { YoutubeService } from '../shared/services/youtube.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  videos: Array<SafeVideo> = new Array();

  constructor(
    private youtubeService: YoutubeService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.youtubeService.getAllVideos().subscribe( (youtubeArtistes: Array<Youtube>) => {
      youtubeArtistes.forEach(yt => {
        if(yt.videos.length > 0){
          yt.videos.forEach(video => {
              const url = this.sanitizer.bypassSecurityTrustResourceUrl("//www.youtube.com/embed/"+video.id);
              const v = new SafeVideo(url, video.description)
              this.videos.push(v);
            }
          )
        }
      });
    })
  }

}
