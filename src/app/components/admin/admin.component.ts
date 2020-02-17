import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { User } from '../../models/user';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  
  @ViewChild("mymodalbor", {static: true}) mymodalbor: TemplateRef<any>;
  private usuarios: Array<User>;
  private unnombre = '';
  private tipo = true;
  private opcion = true;
  private id: number;

  constructor(public _fc: FirebaseForoService, private modalService: NgbModal, private router: Router) {

    if (JSON.parse(localStorage.getItem('theItem')) === null){
      this.router.navigate(['/notfound']);
    } else {
      this._fc.getUsuarioId(parseInt(localStorage.getItem('theItem'))).subscribe(data => {
        data.forEach(e => {
          if (!e['admin']){
            this.router.navigate(['/notfound']);
          }
        });
      });
    }

    this._fc.getUsuarios().subscribe(data => {
      this.usuarios = [];
      data.forEach(e => {
        this.usuarios.push(new User(e['id'],e['usuario'] ,e['email'],e['contrasena'],e['nombreappe'],e['sexo'],e['pais'],e['aficiones'],e['admin'], e['bloqueado']));
      });
    })
   }

  ngOnInit() {
  }

  chblock(int: number){
    if (int !== 0){
      this.tipo = true;
      this.unnombre = this.usuarios.find(element => element.getId() === int).getUsuario();
      
      if (this.usuarios.find(element => element.getId() === int).isBloqueado()){
        this.opcion = false;
      } else {
        this.opcion = true;
      }
      this.id = int;

      this.modalService.open(this.mymodalbor);
    }
  }

  chadmin(int: number){
    if (int !== 0){
      this.tipo = false;
      this.unnombre = this.usuarios.find(element => element.getId() === int).getUsuario();
      
      if (this.usuarios.find(element => element.getId() === int).isAdmin()){
        this.opcion = false;
      } else {
        this.opcion = true;
      }
      this.id = int;
      
      this.modalService.open(this.mymodalbor);
    }
  }

  si(){

    let usuario: User;
    if (this.tipo){
      usuario = this.usuarios.find(element => element.getId() === this.id);
      usuario.setBloqueado(!usuario.isBloqueado());
    } else {
      usuario = this.usuarios.find(element => element.getId() === this.id);
      usuario.setAdmin(!usuario.isAdmin());
    }

    this._fc.upUser(usuario);
    this.modalService.dismissAll();
  }

  no(){
    this.modalService.dismissAll();
  }
}
