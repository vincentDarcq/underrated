import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/services';

@Injectable({
  providedIn: 'root'
})
export class NosServicesService {

  constructor(
    private http: HttpClient
  ) { }

  public createService(service: Service, image?: FormData): Observable<Service> {
    return this.http.post<Service>('/api/service/createService', service);
  }

  public getServices(): Observable<Array<Service>> {
    return this.http.get<Array<Service>>('/api/service/get');
  }
}
