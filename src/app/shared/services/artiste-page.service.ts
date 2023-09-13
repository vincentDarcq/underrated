import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
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

  public modifierPage(artistePage: ArtistePage) : Promise<ArtistePage>{
    const modif = this.http.post<ArtistePage>(`/api/artistePage/modifierArtistePage`, artistePage);
    return lastValueFrom(modif);
  }

  public uploadPhoto(artiste: string, photo: FormData) : Observable<ArtistePage>{
    return this.http.post<ArtistePage>(`/api/artistePage/addPhoto`, photo, {
      params: {
        artiste: artiste
      }
    });
  }

  public uploadImageProjet(artiste: string, projetName: string, image: FormData) : Promise<ArtistePage>{
    const imageProjet = this.http.post<ArtistePage>(`/api/artistePage/addImageProjet`, image, {
      params: {
        artiste: artiste,
        projetName: projetName
      }
    });
    return lastValueFrom(imageProjet);
  }

  public deleteArtistePage(artisteName: string) {
    return this.http.get<ArtistePage>(`/api/artistePage/deleteArtiste`, {
      params: {
        nom: artisteName
      }
    })
  }
}
