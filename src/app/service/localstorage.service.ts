import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  itemValue = new Subject();

  constructor() { }

  set usuario(value) {
    this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
    sessionStorage.setItem('usuario', value);
  }
 
  get usuario() {
    return sessionStorage.getItem('usuario');
  }

}
