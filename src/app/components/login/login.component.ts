import { Component, OnInit } from '@angular/core';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../service/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  private usuario: User;
  private valido = true;
  private bloqueado = false;


  constructor(public _fc: FirebaseForoService, private router: Router, private globalService: LocalstorageService) {}

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if(this.usuario === null){
      this.usuario = new User();
    } else {
      this.router.navigate(['/home']);
    }
  }

  login(form: NgForm){
    let user: User;

    this._fc.getUsertoLogin(this.usuario.getUsuario(), this.usuario.getContrasena()).subscribe(data=>{
      if (data.find(element => element.usuario === this.usuario.getUsuario() 
        && element.contrasena === this.usuario.getContrasena()) !== undefined){

          const ususac = data.find(element => element.usuario === this.usuario.getUsuario()
            && element.contrasena === this.usuario.getContrasena());
          user = new User(
          ususac['id'],
          ususac['usuario'],
          ususac['email'],
          ususac['contrasena'],
          ususac['nombreappe'],
          ususac['sexo'],
          ususac['pais'],
          ususac['aficiones'],
          ususac['admin'],
          ususac['bloqueado']
          );

          console.log(this.usuario);
          if (ususac['bloqueado'] === true){
            this.bloqueado = true;
            this.valido = true;
          } else {
            this.valido = true;
            this.globalService.usuario = user;
            this.router.navigate(['/home']);
          }
      } else {
        this.valido = false;
        this.bloqueado = false;
      }
    });
  }

}
