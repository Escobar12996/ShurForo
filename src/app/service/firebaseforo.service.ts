import {Injectable} from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Mensaje } from '../models/mensaje';
import { Tema } from '../models/tema';
import { Grupo } from '../models/grupo';
import { Seccion } from '../models/seccion';

@Injectable()
export class FirebaseForoService {

// coleccion de objetos de tipo any
  public items: AngularFirestoreCollection<any>;

// constructor
  constructor( private fb: AngularFirestore){}


// zona de grupos
  getGrupos() {
    this.items = this.fb.collection<any>('grupos',
                        ref => ref.orderBy('id_grupo', 'asc'));
    return this.items.valueChanges();
  }

  findGrupo( grupo: Grupo ) {
    this.items = this.fb.collection<any>('grupos', ref => ref.where('id_grupo', '==', grupo.getIdgrupo()));
    return this.items.valueChanges();
  }

  saveGrupo( grupo: Grupo) {
    return this.fb.collection('grupos')
            .doc('' + grupo.getIdgrupo())
            .set(grupo.toObject());
  }

  upGrupo( grupo: Grupo ) {
    return this.fb.collection('grupos')
            .doc('' + grupo.getIdgrupo())
            .update(grupo.toObject());
  }

  delGrupo( grupo: Grupo ) {
    return this.fb.collection('grupos')
            .doc('' + grupo.getIdgrupo())
            .delete();
  }

// zona de secciones
  getSecciones( grupo: Grupo ) {
    this.items = this.fb.collection<any>('seccion',
                          ref => ref.where('id_grupo', '==', grupo.getIdgrupo()));
    return this.items.valueChanges();
  }

  getSeccion( seccion: Seccion ) {
    this.items = this.fb.collection<any>('seccion',
                        ref => ref.where('id_grupo', '==', seccion.getGrupo())
                                  .where('id_seccion', '==', seccion.getSeccion()));
    return this.items.valueChanges();
  }

  saveSeccion( seccion: Seccion ) {
    return this.fb.collection('seccion')
            .doc('' + seccion.getSeccion() + seccion.getGrupo())
            .set(seccion.toObject());
  }

  upSeccion( seccion: Seccion ) {
    return this.fb.collection('seccion')
            .doc('' + seccion.getSeccion() + seccion.getGrupo())
            .update(seccion.toObject());
  }

  delSeccion( seccion: Seccion ) {
    return this.fb.collection('seccion')
            .doc('' + seccion.getSeccion() + seccion.getGrupo())
            .delete();
  }


// zona de los temas
  getTemas( seccion: Seccion ) {

    this.items = this.fb.collection<any>('tema',
                  ref => ref.where('id_grupo', '==', seccion.getGrupo())
                  .where('id_seccion', '==', seccion.getSeccion())
                  .orderBy('fecha', 'desc'));
    return this.items.valueChanges();
  }

  getThisTema( tema: Tema ) {
    this.items = this.fb.collection<any>('tema',
                  ref => ref.where('id_grupo', '==', tema.getGrupo())
                  .where('id_seccion', '==', tema.getSeccion())
                  .where('id_tema', '==', tema.getidtema()));
    return this.items.valueChanges();
  }

  savethisTema( tema: Tema ) {
    return this.fb.collection('tema')
            .doc('' + tema.getGrupo() + tema.getSeccion() + tema.getidtema() )
            .set( tema.toObject() );
  }
  
  updateTema( tema: Tema ) {
    return this.fb.collection('tema')
            .doc('' + tema.getGrupo() + tema.getSeccion() + tema.getidtema() )
            .update( tema.toObject() );
  }

  deltema( tema: Tema ){
    return this.fb.collection('tema')
            .doc( '' + tema.getGrupo() + tema.getSeccion() + tema.getidtema() )
            .delete();
  }

// zona de mensajes
  getMensajes( tema: Tema ){
    this.items = this.fb.collection<any>('mensajes',
                        ref => ref.where('tema', '==', tema.getidtema())
                        .where('seccion', '==', tema.getSeccion())
                        .where('grupo', '==', tema.getGrupo())
                        .orderBy('id'));
    return this.items.valueChanges();
  }

  saveMensaje( mensaje: Mensaje ) {
    return this.fb.collection('mensajes')
            .doc('' + mensaje.getGrupo() + mensaje.getId()
                + mensaje.getSeccion() + mensaje.getTema()
                + mensaje.getUsuario())
                  .set(mensaje.toObject());
  }

  upMensaje( mensaje: Mensaje ) {
    return this.fb.collection('mensajes')
            .doc('' + mensaje.getGrupo() + mensaje.getId()
                  + mensaje.getSeccion() + mensaje.getTema()
                  + mensaje.getUsuario())
                    .update(mensaje.toObject());
  }

  delMensaje( mensaje: Mensaje ) {
    return this.fb.collection('mensajes')
            .doc('' + mensaje.getGrupo() + mensaje.getId()
                  + mensaje.getSeccion() + mensaje.getTema()
                  + mensaje.getUsuario())
                    .delete();
  }

// zona de usuarios
  getUsuarios() {
    this.items = this.fb.collection<any>('usuarios');
    return this.items.valueChanges();
  }

  getUsertoLogin(usuario: string, password: string){
    this.items = this.fb.collection<any>('usuarios', ref => ref.where('usuario', '==', usuario).where('contrasena', '==', password));
    return this.items.valueChanges();
  }

  getUserlastid(){
    this.items = this.fb.collection<any>('usuarios', ref => ref.orderBy('id','asc'));
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

  upUser( user: User){
    return this.fb.collection('usuarios').doc(""+user.getId()).update(user.toRegister());
  }

}