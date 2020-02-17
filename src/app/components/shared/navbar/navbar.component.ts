import { Component, OnInit, OnDestroy  } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../service/localstorage.service';
import { FirebaseForoService } from '../../../service/firebaseforo.service';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  private login = false;
  private admin = false;
  private nombre = '';
  private usuario: User;
  private cargado = false;

  private bucle: SubscriptionLike;

  constructor(private router: Router, private globalService: LocalstorageService, public _fc: FirebaseForoService) {}

  ngOnInit() {

    this.globalService.itemValue.subscribe((nextValue: string) => {
      this.bucle = this._fc.getUsuarioId(parseInt(nextValue)).subscribe(data => {
        data.forEach(e => {
          this.usuario = new User(e['id'],e['usuario'] ,e['email'],e['contrasena'],e['nombreappe'],e['sexo'],e['pais'],e['aficiones'],e['admin'], e['bloqueado']);
          this.login = true;
          this.nombre = this.usuario.getUsuario();
          if (e['admin']) {
            this.admin = true;
          }

          if (e['bloqueado']){
            this.logOut();
          }
        });
      });
    });

    if (JSON.parse(localStorage.getItem('theItem')) !== null && this.cargado === false){

      this.bucle = this._fc.getUsuarioId(parseInt(localStorage.getItem('theItem'))).subscribe(data => {
        data.forEach(e => {
          this.usuario = new User(e['id'],e['usuario'] ,e['email'],e['contrasena'],e['nombreappe'],e['sexo'],e['pais'],e['aficiones'],e['admin'], e['bloqueado']);
          console.log(this.usuario);
          this.login = true;
          this.nombre = this.usuario.getUsuario();
          if (e['admin']) {
            this.admin = true;
          }else {
            this.admin = false;
          }
          if (e['bloqueado']){
            this.logOut();
          }
        });
      });
    }
  }

  logOut(){
    this.globalService.limpiar();
    this.usuario = undefined;
    this.login = false;
    this.admin = false;
    this.router.navigate(['/login']);
  }
}
