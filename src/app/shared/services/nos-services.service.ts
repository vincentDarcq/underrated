import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service } from '../models/services';

@Injectable({
  providedIn: 'root'
})
export class NosServicesService {

  services: BehaviorSubject<Array<Service>> = new BehaviorSubject(new Array<Service>());

  constructor(
    private http: HttpClient
  ) { 
    this.http.get<Array<Service>>('/api/service/get').subscribe( (services: Array<Service>) => {
      this.services.next(services);
    })
  }

  public createService(service: Service, image?: FormData): void {
    this.http.post<Service>('/api/service/createService', service).subscribe( (service: Service) => {
      this.http.post<Service>(`/api/service/uploadImage`, image, {
        params: {
          id: service._id
        }
      }).subscribe( (service: Service) => {
        const serv = this.services.value;
        serv.push(service);
        this.services.next(serv);
      })
    });
  }

  public modifyService(service: Service, image?: FormData): void {
    this.http.post<Service>('/api/service/modifyService', service).subscribe( (service: Service) => {
      if(image.get("imageServiceModified") !== null){
        this.http.post<Service>(`/api/service/modifyImage`, image, {
          params: {
            id: service._id
          }
        }).subscribe( (service: Service) => {
          const serv = this.services.value;
          const index = serv.findIndex(s => s._id === service._id);
          serv[index].image = service.image;
          this.services.next(serv);
        })
      }
    });
  }

  public deleteService(id: string) {
    this.http.get<Service>(`/api/service/deleteService`, {
      params: {
        id: id
      }
    }).subscribe( (service: Service) => {
      const serv = this.services.value;
      const index = serv.findIndex(service => service._id === id);
      serv.splice(index, 1);
      this.services.next(serv);
    })
  }
}
