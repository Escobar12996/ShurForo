import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LocalstorageService } from '../../../service/localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  private login = false;
  

  constructor(private router: Router, private globalService: LocalstorageService) { }

  ngOnInit() {

    this.globalService.itemValue.subscribe((nextValue) => {

      if (JSON.parse(this.globalService.usuario) == null){
        this.login = true;
      } else {
        this.login = false;
      }
      return null;
      
   })

   if (JSON.parse(sessionStorage.getItem('usuario')) !== null){
    this.login = true;
   }

  }

  logOut(){
    this.globalService.usuario = null;

    this.router.navigate(['/login']);

  }

}
