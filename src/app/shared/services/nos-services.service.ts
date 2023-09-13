import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, tap } from 'rxjs';
import { Service } from '../models/services';
import { InfosService } from './infos.service';

@Injectable({
  providedIn: 'root'
})
export class NosServicesService {

  services: BehaviorSubject<Array<Service>> = new BehaviorSubject(new Array<Service>());

  constructor(
    private http: HttpClient,
    private infoService: InfosService
  ) { 
    this.http.get<Array<Service>>('/api/service/get').subscribe( (services: Array<Service>) => {
      this.services.next(services);
    })
  }

  public getServices(): Promise<Array<Service>>{
    const services = this.http.get<Array<Service>>('/api/service/get')
    .pipe(
      tap((services: Array<Service>) => {
        this.services.next(services);
      })
    )
    return lastValueFrom(services);
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

  public modifyService(service: Service): Promise<Service> {
    const serviceModified = this.http.post<Service>('/api/service/modifyService', service);
    return lastValueFrom(serviceModified);
  }

  public modifyImageService(serviceId: string, image: FormData): Promise<Service>{
    const imageService = this.http.post<Service>(`/api/service/modifyImage`, image, {
      params: {
        id: serviceId
      }
    }).pipe(
      tap((service: Service) => {
        const serv = this.services.value;
        const index = serv.findIndex(s => s._id === service._id);
        serv[index].image = service.image;
        this.services.next(serv);
      })
    )
    return lastValueFrom(imageService);
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
      this.infoService.popupInfo(`Le service ${service.titre} a bien été supprimé`);
    })
  }
}
