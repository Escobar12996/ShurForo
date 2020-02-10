import {Injectable} from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import { User } from '../models/user';
import { Mensaje } from '../models/mensaje';
import { Tema } from '../models/tema';

@Injectable()
export class FirebaseForoService {

// coleccion de objetos de tipo any
  public items: AngularFirestoreCollection<any>;

// constructor
  constructor( private fb: AngularFirestore){}


// zona de grupos
  getGrupos(){
    this.items = this.fb.collection<any>('grupos');
    return this.items.valueChanges();
  }


// zona de secciones
  getSecciones( grupo: string){
    this.items = this.fb.collection<any>('seccion', ref => ref.where('grupo', '==', grupo));
    return this.items.valueChanges();
  }


// zona de los temas
  getTemas( seccion: string, grupo: string){
    this.items = this.fb.collection<any>('tema', ref => ref.where('seccion', '==', seccion).where('grupo', '==', grupo));
    return this.items.valueChanges();
  }


// zona de mensajes
  getMensajes( tema: string, seccion: string, grupo: string){
    this.items = this.fb.collection<any>('mensajes', ref => ref.where('tema', '==', tema).orderBy('id'));
    return this.items.valueChanges();
  }

  saveMensaje( mensaje: Mensaje){
    return this.fb.collection('mensajes')
            .doc(mensaje.getGrupo()+mensaje.getId()+mensaje.getSeccion()+mensaje.getTema()+mensaje.getUsuario())
            .set(mensaje.toObject());
  }

// zona de usuarios
  getUsuarios(){
    this.items = this.fb.collection<any>('usuarios');
    return this.items.valueChanges();
  }

  saveUser( user: User){
    return this.fb.collection('usuarios').doc(user.getUsuario()).set(user.toObject());
  }

}