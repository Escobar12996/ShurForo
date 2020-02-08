import { Component, OnInit } from '@angular/core';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  private usuario: UserModel;
  private valido = true;


  constructor(public _fc: FirebaseForoService, private router: Router) {
  }
  
  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    if(this.usuario === null){
      this.usuario = new UserModel();
    }else{
      this.router.navigate(['/home']);
      
    }
  }

  login(form: NgForm){
    let user: UserModel;

    this._fc.getUsuarios().subscribe(data=>{
      if (data.find(element => element.usuario === this.usuario.usuario && element.contrasena === this.usuario.contrasena) !== undefined){
          let ususac = data.find(element => element.usuario === this.usuario.usuario && element.contrasena === this.usuario.contrasena);
          user = new UserModel(
          ususac['usuario'],
          ususac['email'],
          ususac['contrasena'],
          ususac['nombreappe'],
          ususac['sexo'],
          ususac['pais'],
          ususac['aficiones']
          );
          this.valido = true;
          localStorage.setItem('usuario', JSON.stringify(user));
          this.router.navigate(['/home']);
      } else {
        this.valido = false;
      }
    });
  }

}
