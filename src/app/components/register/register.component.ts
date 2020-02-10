import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  validado = false;
  usuario: User;
  validanombre = true;
  validaemail = true;

  public mArray:String[] = ["Videojuegos","Lectura","Netflix","Deporte","Motociclismo","Gastronomia"];

  constructor(public _fc: FirebaseForoService) { }

  ngOnInit() {
    this.usuario = new User();
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
        this.usuario = new User();
        this.validado = false;
        this.validanombre = true;
        this.validaemail = true;
    }
  }

  onCheckChange(pass: string) {
    this.usuario.changeAficiones(pass);
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
