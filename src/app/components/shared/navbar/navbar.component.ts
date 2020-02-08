import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LocalstorageService } from '../../../service/localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  private login = false;
  

  constructor(private router: Router, private globalSrv: LocalstorageService) { }

  ngOnInit() {

    this.globalSrv.itemValue.subscribe((nextValue) => {
      if (JSON.parse(this.globalSrv.usuario) == null){
        this.login = true;
      } else {
        this.login = false;
      }
   })


  }

  logOut(){
    this.globalSrv.usuario = null;

    this.router.navigate(['/login']);

  }

}
