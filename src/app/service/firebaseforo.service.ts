import {Injectable} from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import { UserModel } from '../models/user';

@Injectable()
export class FirebaseForoService {

  public items: AngularFirestoreCollection<any>;


  constructor( private fb:AngularFirestore){}

  getGrupos(){
    this.items = this.fb.collection<any>('grupos');
    return this.items.valueChanges();
  }

  getUsuarios(){
    this.items = this.fb.collection<any>('usuarios');
    return this.items.valueChanges();
  }

  getSecciones( grupo:string){
    this.items = this.fb.collection<any>('seccion', ref => ref.where('grupo', '==', grupo));
    return this.items.valueChanges();
  }

  saveUser( user: UserModel){
    // this.items = this.fb.collection<any>('usuarios');
    console.log( this.fb.collection('usuarios'));
    return this.fb.collection('usuarios').add(user.toObject());
  }

}