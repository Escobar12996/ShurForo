import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { of, fromEvent } from 'rxjs';
import { LocalstorageService } from '../../../service/localstorage.service';
import { FirebaseForoService } from '../../../service/firebaseforo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  private login = false;
  private admin = false;
  private nombre = "";
  private idu: number;
  private usuario: User;

  constructor(private router: Router, private globalService: LocalstorageService, public _fc: FirebaseForoService) {}

  ngOnInit() {
    this.login = false;
    this.admin = false;

    this.globalService.itemValue.subscribe((nextValue) => {

      this.usuario = this.globalService.usuario;

      if (nextValue != null) {
          this.login = true;
          this.nombre = nextValue['nombreappe'];
          this.admin = nextValue['admin'];

      } else {
        this.login = false;
        this.admin = false;
      }
      return null;
    });

    if (JSON.parse(sessionStorage.getItem('usuario')) !== null){
      this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
      this.login = true;
      this.nombre = JSON.parse(sessionStorage.getItem('usuario'))['nombreappe'];
      this.admin = JSON.parse(sessionStorage.getItem('usuario'))['admin'];
      console.log("2");
    } else {
      this.login = false;
      this.admin = false;
    }
  }

  logOut(){
    this.globalService.limpiar();
    this.router.navigate(['/login']);
    this.login = false;
    this.admin = false;
  }
}
