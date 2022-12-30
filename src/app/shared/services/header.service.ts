import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  activeHeader: BehaviorSubject<string> = new BehaviorSubject('home');

  constructor() { }

  setActiveHeader(header: string){
    this.activeHeader.next(header);
  }
}
