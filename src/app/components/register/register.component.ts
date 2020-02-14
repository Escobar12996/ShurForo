import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../service/localstorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  repebool = false;
  repetida = '';
  unavuelta = true;
  validado = false;
  usuario: User;
  validanombre = true;
  validaemail = true;

  public mArray:String[] = ["Videojuegos","Lectura","Netflix","Deporte","Motociclismo","Gastronomia"];

  constructor(public _fc: FirebaseForoService, private router: Router, private globalService: LocalstorageService) {
    this.usuario = new User();
   }

  ngOnInit() {
  }
  
  validate(){
    this.validado = true;
  }

  primerEnvio( form: NgForm ){
    if (!form.invalid && this.validanombre && this.validaemail && this.repetida === this.usuario.getContrasena() ){
      this.validado = true;
      this.repebool = false;
    } else if (this.repetida !== this.usuario.getContrasena()) {
      this.repebool = true;
    } else {
      this.repebool = false;
    }
  }

  segundoEnvio( form: NgForm ){

    if (!form.invalid){

      this._fc.getUserlastid().subscribe(data=>{
        if (this.unavuelta === true){
          this.usuario.setId(data.length);

          console.log(this.usuario.getId());
          this._fc.saveUser(this.usuario);
  
          this.globalService.usuario = this.usuario;
          this.router.navigate(['/home']);
          
          this.unavuelta = false;
          return false;
        }
       
      });
    }
  }

  onCheckChange(pass: string) {
    this.usuario.changeAficiones(pass);
  }

  buscaUser(value: string){
    this._fc.getUsuarioNombre(value).subscribe(data=>{
      if (data.find(element => element.usuario === value) !== undefined){
          this.validanombre = false;
          return null;
      }
    });
    this.validanombre = true;
  }

  buscaEmail(value: string){
    this._fc.getUsuarioEmail(value).subscribe(data=>{
      if (data.find(element => element.email === value) !== undefined){
          this.validaemail = false;
          return null;
      }
    });
    this.validaemail = true;
  }
}
