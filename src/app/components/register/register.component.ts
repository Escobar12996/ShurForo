import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user';
import { NgForm } from '@angular/forms';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  validado = false;
  usuario: UserModel;
  validanombre = true;
  validaemail = true;

  public mArray:String[] = ["Videojuegos","Lectura","Netflix","Deporte","Motociclismo","Gastronomia"];

  constructor(public _fc: FirebaseForoService) { }

  ngOnInit() {
    this.usuario = new UserModel();
  }
  
  validate(){
    this.validado = true;
  }

  primerEnvio( form: NgForm ){
    if (!form.invalid && this.validanombre && this.validaemail){
      this.validado=true;
    }
  }

  segundoEnvio( form: NgForm ){
    
    if (!form.invalid){
        this._fc.saveUser(this.usuario);
        this.usuario = new UserModel();
        this.validado = false;
    }
  }

  onCheckChange(pass) {
    let booleano = false;
    let poss = 0;

    if (this.usuario.aficiones != undefined){
      for (let i = 0; i < this.usuario.aficiones.length; i++){
        if (this.usuario.aficiones[i] === pass){
          booleano = true;
          poss = i;
        }
      }
      if (booleano === true){
        this.usuario.aficiones.splice(poss, 1);
      } else if (this.usuario.aficiones != undefined){
        this.usuario.aficiones[this.usuario.aficiones.length] = pass;
      }
    } else {
      this.usuario.aficiones = [];
      this.usuario.aficiones[0] = pass;
    }
    console.log(this.usuario.aficiones);
  }

  buscaUser(value: string){
    this._fc.getUsuarios().subscribe(data=>{
      if (data.find(element => element.usuario === value) !== undefined){
          this.validanombre = false;
          return null;
      }
    });
    this.validanombre = true;
  }

  buscaEmail(value: string){
    this._fc.getUsuarios().subscribe(data=>{
      if (data.find(element => element.email === value) !== undefined){
          this.validaemail = false;
          return null;
      }
    });
    this.validaemail = true;
  }
}
