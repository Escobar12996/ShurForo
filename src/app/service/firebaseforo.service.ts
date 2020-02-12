import {Injectable} from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Mensaje } from '../models/mensaje';

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

  findGrupo(grupoid: number){
    this.items = this.fb.collection<any>('grupos', ref => ref.where('id_grupo', '==', grupoid));
    return this.items.valueChanges();
  }


// zona de secciones
  getSecciones( grupo: number){
    this.items = this.fb.collection<any>('seccion', ref => ref.where('id_grupo', '==', grupo));
    return this.items.valueChanges();
  }


// zona de los temas
  getTemas( grupo: number, seccion: number){

    this.items = this.fb.collection<any>('tema',
                  ref => ref.where('id_grupo', '==', grupo)
                  .where('id_seccion', '==', seccion));
    return this.items.valueChanges();
  }

  getThisTema(grupo: number, seccion: number, nombre: string){
    this.items = this.fb.collection<any>('tema',
                  ref => ref.where('id_grupo', '==', grupo)
                  .where('id_seccion', '==', seccion)
                  .where('nombretema', '==', nombre));
    return this.items.valueChanges();
  }


// zona de mensajes
  getMensajes( tema: number, seccion: number, grupo: number){
    this.items = this.fb.collection<any>('mensajes', ref => ref.where('tema', '==', tema).orderBy('id'));
    return this.items.valueChanges();
  }

  saveMensaje( mensaje: Mensaje){
    return this.fb.collection('mensajes')
            .doc(""+mensaje.getGrupo()+mensaje.getId()+mensaje.getSeccion()+mensaje.getTema()+mensaje.getUsuario())
            .set(mensaje.toObject());
  }

// zona de usuarios
  getUsuarios(){
    this.items = this.fb.collection<any>('usuarios');
    return this.items.valueChanges();
  }

  getUsertoLogin(usuario: string, password: string){
    this.items = this.fb.collection<any>('usuarios', ref => ref.where('usuario', '==', usuario).where('contrasena', '==', password));
    return this.items.valueChanges();
  }

  getUserlastid(){
    this.items = this.fb.collection<any>('usuarios', ref => ref.orderBy('id'));
    return this.items.valueChanges();
  }

  getUsuarioId(id: number){
    this.items = this.fb.collection<any>('usuarios', ref => ref.where('id', '==', id));
    return this.items.valueChanges();
  }

  getUsuarioEmail(correo: string){
    this.items = this.fb.collection<any>('usuarios', ref => ref.where('email', '==', correo));
    return this.items.valueChanges();
  }

  getUsuarioNombre(nombre: string){
    this.items = this.fb.collection<any>('usuarios', ref => ref.where('usuario', '==', nombre));
    return this.items.valueChanges();
  }

  saveUser( user: User){
    return this.fb.collection('usuarios').doc(""+user.getId()).set(user.toRegister());
  }

}