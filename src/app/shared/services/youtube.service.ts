import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Youtube } from '../models/youtube';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  token: string = "AIzaSyCMyhTnaRmQmgBocwl6aTlfeMf4kF6pE7M";

  constructor(private http: HttpClient) { }

  public getAllVideos(): Observable<Array<Youtube>>{
    return this.http.get<Array<Youtube>>(`/api/youtube/findAll`);
  }

  public createYoutubeArtiste(artiste: string): Observable<any>{
    return this.http.get<any>(`/api/youtube/createYoutube`, {
      params: {
        artiste: artiste
      }
    });
  }

  public pushVideo(artiste: string, videoId: string, videoDescription: string): Observable<Array<Youtube>>{
    return this.http.post<Array<Youtube>>(`/api/youtube/pushVideo`, { id: videoId, description: videoDescription }, {
      params: {
        artiste: artiste
      }
    });
  }

  public pullVideo(artiste: string, videoId: string): Observable<Array<Youtube>>{
    return this.http.get<Array<Youtube>>(`/api/youtube/pullVideo`, {
      params: {
        artiste: artiste,
        id: videoId
      }
    });
  }

  public deleteYtArtiste(id: string){
    return this.http.get<Youtube>(`/api/youtube/deleteOne`, {
      params: {
        id: id
      }
    });
  }
}
