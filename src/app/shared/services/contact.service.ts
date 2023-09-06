import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  public sendMail(contact: Contact): Promise<string>{
    return this.http.post<string>(`/api/contact/sendMail`, contact).toPromise();
  }
}
