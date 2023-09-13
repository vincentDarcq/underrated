import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom, pipe } from 'rxjs';
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
    this.getArtistes();
  }

  public getArtistes(): Promise<Array<Artiste>>{
    const artistes = this.http.get<Array<Artiste>>('/api/artiste/findAll')
    .pipe(
      tap((artistes: Array<Artiste>) => {
        this.artistes.next(artistes);
      })
    );
    return lastValueFrom(artistes);
  }

  public createArtiste(artiste: Artiste, photo: FormData): Promise<{artiste: Artiste, artistePage: ArtistePage}>{
    const createArtiste = this.http.post<{artiste: Artiste, artistePage: ArtistePage}>(`/api/artistePage/createArtiste`, artiste).pipe( 
      tap(
        (rep: {artiste: Artiste, artistePage: ArtistePage}) => {
          const artistes = this.http.post<Artiste>(`/api/artistePage/addPhoto`, photo, {
            params: {
              id: rep.artiste._id
            }
          })
          lastValueFrom(artistes).then((a: Artiste) => {
            const arts = this.artistes.value;
            arts.push(a);
            this.artistes.next(arts);
          })
      }));
    return lastValueFrom(createArtiste);
  }

  public deleteArtiste(id: string): Promise<Artiste> {
    const deleteArtiste = this.http.get<Artiste>(`/api/artiste/deleteOne`, {
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
    return lastValueFrom(deleteArtiste);
  }
}
