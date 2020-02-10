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

  validado = false;
  usuario: User;
  validanombre = true;
  validaemail = true;

  public mArray:String[] = ["Videojuegos","Lectura","Netflix","Deporte","Motociclismo","Gastronomia"];

  constructor(public _fc: FirebaseForoService, private router: Router, private globalService: LocalstorageService) { }

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
    
    let lastid = 0;

    if (!form.invalid){

      this._fc.getUserlastid().subscribe(data=>{
        lastid = data.length;
      });

      this.usuario.setId(lastid);
      this._fc.saveUser(this.usuario);

      this.globalService.usuario = JSON.stringify(this.usuario.toObject());
      this.router.navigate(['/home']);
      
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
