import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { findLast } from '@angular/compiler/src/directive_resolver';
import { FirebaseForoService } from '../../service/firebaseforo.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html'
})
export class UserdataComponent implements OnInit {

  private usuario: User = new User();
  private validanombre = true;
  private validaemail = true;
  private contrasenanuevastring: string;
  private contrasenaviejaintroducida = false;
  private contrasenaviejaacertada = true;
  private contrasenanuevaesacertada = true;
  private doscontrasenasbien = true;

  public mArray: String[] = ["Videojuegos","Lectura","Netflix","Deporte","Motociclismo","Gastronomia"];

  constructor(public _fc: FirebaseForoService) {

    if (JSON.parse(sessionStorage.getItem("usuario")) != null){


      this._fc.getUsuarioId(JSON.parse(sessionStorage.getItem("usuario"))['id']).subscribe(data=>{

console.log(console.log(data));

         const ususac = data[0];
        
         console.log(ususac);

        this.usuario = new User(
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
      });

    }

  }

  ngOnInit() {
  }

  ischeck(aficion: string){

    const aficiones = this.usuario.getAficiones();

    if (aficiones.length <= 0){
      return false;
    } else {
      return aficiones.find(element => element === aficion);
    }
  }

  isselected(pais: string){
    if (this.usuario.getPais() === pais){
      return true;
    } else {
      return false;
    }
  }

  issexo(sexo: string){
    if (this.usuario.getSexo() === sexo) {
      return true;
    } else {
      return false;
    }
  }

  chaficion(aficion: string){
    this.usuario.changeAficiones(aficion);
  }

  buscaUser(value: string){
    this._fc.getUsuarioNombre(value).subscribe(data=>{
      if (data.find(element => element.usuario === value) !== undefined){
        if (value === this.usuario.getUsuario()){
          this.validanombre = true;
          return null;
        } else {
          this.validanombre = false;
          return null;
        }
      }
    });
    this.validanombre = true;
  }

  buscaEmail(value: string){
    this._fc.getUsuarioEmail(value).subscribe(data=>{
      if (data.find(element => element.email === value) !== undefined){
          if (value === this.usuario.getEmail()){
            this.validaemail = true;
            return null;
          } else {
            this.validaemail = false;
            return null;
          }
      }
    });
    this.validaemail = true;
  }

  detectacontrasena(value: string){
    if (this.usuario.getContrasena() === value){
      this.contrasenaviejaintroducida = true;
      this.contrasenaviejaacertada = true;
    } else if (value.length === 0) {
      this.contrasenaviejaintroducida = false;
      this.contrasenaviejaacertada = true;
    } else {
      this.contrasenaviejaintroducida = false;
      this.contrasenaviejaacertada = false;
    }
    return null;
  }

  contrasenanueva(value: string, bool: boolean){
    if (bool === true) {
      
      if (value.length > 7 && this.contrasenaviejaintroducida === true){
        this.contrasenanuevastring = value;
        this.contrasenanuevaesacertada = true;
      } else if (value.length > 7 && this.contrasenaviejaintroducida === false){
        this.contrasenanuevastring = "";
        this.contrasenaviejaacertada = false;
        this.contrasenanuevaesacertada = true;
      } else if (value.length < 8 && value.length > 0){
        this.contrasenanuevastring = "";
        this.contrasenanuevaesacertada = false;
      } else {
        this.contrasenanuevastring = "";
        this.contrasenanuevaesacertada = true;
      }

    } else {
      if (value === this.contrasenanuevastring) {
        this.doscontrasenasbien = true;
      } else if (value.length > 0) {
        this.doscontrasenasbien = false;
      } else {
        this.doscontrasenasbien = true;
      }
    }
  }

}
