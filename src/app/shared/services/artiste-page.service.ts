import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistePage } from '../models/artistePage';

@Injectable({
  providedIn: 'root'
})
export class ArtistePageService {

  constructor(private http: HttpClient) { }

  public getAllPages(): Observable<Array<ArtistePage>>{
    return this.http.get<Array<ArtistePage>>(`/api/artistePage/findAll`);
  }

  public getPage(artiste: string) : Observable<ArtistePage>{
    return this.http.get<ArtistePage>(`/api/artistePage/findArtiste`, {
      params: {
        artiste: artiste
      }
    });
  }

  public modifierPage(artistePage: ArtistePage) : Observable<ArtistePage>{
    return this.http.post<ArtistePage>(`/api/artistePage/modifierArtistePage`, artistePage);
  }

  public uploadPhoto(artiste: string, photo: FormData) : Observable<ArtistePage>{
    return this.http.post<ArtistePage>(`/api/artistePage/addPhoto`, photo, {
      params: {
        artiste: artiste
      }
    });
  }

  public uploadPochette(artiste: string, pochette: FormData) : Observable<ArtistePage>{
    return this.http.post<ArtistePage>(`/api/artistePage/uploadPhotoAlbum`, pochette, {
      params: {
        artiste: artiste
      }
    });
  }
}
