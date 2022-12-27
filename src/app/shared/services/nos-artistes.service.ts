import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Artiste } from '../models/artiste';

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

  public createArtiste(artiste: Artiste, photo: FormData){
    this.http.post<Artiste>(`/api/artiste/createArtiste`, artiste).subscribe( (art: Artiste) => {
      this.http.post<Artiste>(`/api/artiste/uploadPhotoArtiste`, photo, {
        params: {
          id: art._id
        }
      }).subscribe( (a: Artiste) => {
        const arts = this.artistes.value;
        arts.push(a);
        this.artistes.next(arts);
      })
    })
  }

  public deleteArtiste(id: string) {
    this.http.get<Artiste>(`/api/artiste/deleteOne`, {
      params: {
        id: id
      }
    }).subscribe( (service: Artiste) => {
      const arts = this.artistes.value;
      const index = arts.indexOf(service);
      arts.splice(index, 1);
      this.artistes.next(arts);
    })
  }
}
