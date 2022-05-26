import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  token: string = "AIzaSyCMyhTnaRmQmgBocwl6aTlfeMf4kF6pE7M";

  constructor(private http: HttpClient) { }

  public getVideos(): Observable<any>{
    return this.http.get<any>(`https://youtube.googleapis.com/youtube/v3/search?channelId=UCDI_nH78WWDr4ujtgBFj0Fw&maxResults=50&key=${this.token}`);
  }
}
