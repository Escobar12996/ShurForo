import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  itemValue = new Subject();

  constructor() { }

  set usuario(value: User) {
    this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
    sessionStorage.setItem('usuario', JSON.stringify(value.toObject()));
  }
 
  limpiar(){
    sessionStorage.setItem('usuario', null);
  }

  get usuario() {
    const usuario: User = JSON.parse(sessionStorage.getItem('usuario'));
    return usuario;
  }

}
