import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArtistePage } from '../models/artistePage';

@Injectable({
  providedIn: 'root'
})
export class ArtistePageService {

  artistesPages: BehaviorSubject<Array<ArtistePage>> = new BehaviorSubject<Array<ArtistePage>>(null);

  constructor(private http: HttpClient) {
    this.getAllPages()
  }

  public getAllPages(): void{
    this.http.get<Array<ArtistePage>>(`/api/artistePage/findAll`).subscribe((artistePages: Array<ArtistePage>) => {
      this.artistesPages.next(artistePages);
    });
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

  public uploadLogo(artiste: string, logo: FormData): Observable<ArtistePage>{
    return this.http.post<ArtistePage>(`/api/artistePage/uploadLogoArtiste`, logo, {
      params: {
        artiste: artiste
      }
    });
  }

  public deleteArtistePage(artisteName: string) {
    return this.http.get<ArtistePage>(`/api/artistePage/deleteArtiste`, {
      params: {
        nom: artisteName
      }
    })
  }
}
