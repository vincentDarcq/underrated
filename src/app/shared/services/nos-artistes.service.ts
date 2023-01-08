import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Artiste } from '../models/artiste';
import { ArtistePage } from '../models/artistePage';

@Injectable({
  providedIn: 'root'
})
export class NosArtistesService {

  artistes: BehaviorSubject<Array<Artiste>> = new BehaviorSubject(new Array<Artiste>());

  constructor(
    private http: HttpClient
  ) { 
    this.http.get<Array<Artiste>>('/api/artiste/findAll').subscribe( (artistes: Array<Artiste>) => {
      this.artistes.next(artistes);
    })
  }

  public createArtiste(artiste: Artiste, photo: FormData): Observable<{artiste: Artiste, artistePage: ArtistePage}>{
    return this.http.post<{artiste: Artiste, artistePage: ArtistePage}>(`/api/artiste/createArtiste`, artiste).pipe( 
      tap(
        (rep: {artiste: Artiste, artistePage: ArtistePage}) => {
          this.http.post<Artiste>(`/api/artiste/uploadPhotoArtiste`, photo, {
            params: {
              id: rep.artiste._id
            }
          })
          .subscribe( 
            (a: Artiste) => {
              const arts = this.artistes.value;
              arts.push(a);
              this.artistes.next(arts);
            })
      }))
  }

  public deleteArtiste(id: string): Observable<Artiste> {
    return this.http.get<Artiste>(`/api/artiste/deleteOne`, {
      params: {
        id: id
      }
    }).pipe(
      tap((artiste: Artiste) => {
        const artistes = this.artistes.value;
        const index = artistes.findIndex(a => a.nom === artiste.nom);
        artistes.splice(index, 1);
        this.artistes.next(artistes);
      })
    )
  }
}
