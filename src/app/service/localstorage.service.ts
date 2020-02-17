import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  itemValue = new Subject();

  constructor() { }

  set theItem(value) {
    this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('theItem', value);
  }
 
  get theItem() {
    return localStorage.getItem('theItem');
  }

  limpiar() {
    localStorage.setItem('theItem', null);
  }
}
