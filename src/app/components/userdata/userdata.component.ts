import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { User } from '../../models/user';
import { findLast } from '@angular/compiler/src/directive_resolver';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html'
})
export class UserdataComponent implements OnInit {

  public usuario: User = new User();
  private usuariocambiar: User = new User();
  private validanombre = true;
  private validaemail = true;
  private contrasenaviejaintroducida = false;
  private unavuelta = false;

  private nosoniguales = false;
  private masdeocho = false;
  private contrasenaviejaintroducidaparacontra = false;
  private contrasenauno = '';
  private contrasenados = '';

  @ViewChild("mymodalbor", {static: true}) mymodalbor: TemplateRef<any>;

  public mArray: String[] = ["Videojuegos","Lectura","Netflix","Deporte","Motociclismo","Gastronomia"];

  constructor(public _fc: FirebaseForoService, private modalService: NgbModal, private router: Router) {

    if (JSON.parse(localStorage.getItem('theItem')) != null){
      let sac = this._fc.getUsuarioId(parseInt(localStorage.getItem('theItem'))).subscribe(data => {
        data.forEach(e => {
          const ususac = data[0];

          if (this.unavuelta == false){
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

            this.usuariocambiar = this.usuario;
            this.unavuelta = true;
            sac.unsubscribe();
          }
        });
      });

    } else {
      this.router.navigate(['/notfound']);
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

  salir() {
    this.modalService.dismissAll();
  }

  detectacontrasena(value: string) {
    if (this.usuario.getContrasena() === value){
      this.contrasenaviejaintroducida = true;
      return false;
    }
    this.contrasenaviejaintroducida = false;
  }

  detectacontrasenaparacontra(value: string) {
    if (this.usuario.getContrasena() === value){
      this.contrasenaviejaintroducidaparacontra = true;
      return false;
    }
    this.contrasenaviejaintroducidaparacontra = false;
  }

  nuevacontra(value: string, bool: boolean) {
    if (bool){
      if (value.length < 8 ) {
        this.nosoniguales = false;
        this.masdeocho = false;
        this.contrasenauno = '';
      } else if ( value.length > 7 ) {
        this.masdeocho = true;
        this.contrasenauno = value;
        if ( value === this.contrasenados ) {
          this.nosoniguales = true;
        } else {
          this.nosoniguales = false;
        }
      }
    } else {
      if ( value === this.contrasenauno ) {
        this.nosoniguales = true;
      } else {
        this.nosoniguales = false;
      }
    }
  }


  aceptarcambios(form: NgForm){

    if (!form.invalid && this.contrasenaviejaintroducida && this.validaemail && this.validanombre){
        
      this.usuariocambiar.setId(this.usuario.getId());
      this.usuariocambiar.setContrasena(this.usuario.getContrasena());
      this.usuariocambiar.setAdmin(this.usuario.isAdmin());
      this.usuariocambiar.setBloqueado(this.usuario.isBloqueado());
      this.modalService.open(this.mymodalbor);
      this._fc.upUser(this.usuariocambiar);
      setTimeout( () => { this.router.navigate(['/home']); }, 2000 );
    }
  }

  cambioscontrasena(form: NgForm){

    if (this.nosoniguales === true && this.masdeocho === true){
      this.modalService.open(this.mymodalbor);
      this.usuariocambiar.setContrasena(this.contrasenauno);
      console.log(this.usuariocambiar);
      this._fc.upUser(this.usuariocambiar);
      setTimeout( () => { this.router.navigate(['/home']); }, 2000 );
    } else {
      console.log("error");
    }

  }

}
