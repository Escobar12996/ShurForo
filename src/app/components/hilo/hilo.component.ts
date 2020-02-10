import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { Mensaje } from '../../models/mensaje';
import { NgForm } from '@angular/forms';
import { storage } from 'firebase';
import { User } from '../../models/user';

@Component({
  selector: 'app-hilo',
  templateUrl: './hilo.component.html'
})
export class HiloComponent implements OnInit {

  private tema: number;
  private seccion: number;
  private grupo: number;
  private mensaje: Mensaje;
  private valido: boolean = false;
  private usuarioexiste: boolean = false;
  private ultimoid: number = 0;

  public mensajes: Array<Mensaje>;
  public usuarios: Array<User>;


  constructor(public _fc: FirebaseForoService, private router: Router) {}

  ngOnInit() {
    this._fc.getUsuarios().subscribe(data=>{
      this.usuarios = [];
      data.forEach(e => {
        this.usuarios.push(new User(e['id'],e['usuario'] ,e['email'],e['contrasena'],e['nombreappe'],e['sexo'],e['pais'],e['aficiones']));
      });
    });

    this.tema = parseInt(sessionStorage.getItem('tema'));
    this.seccion = parseInt(sessionStorage.getItem('seccion'));
    this.grupo = parseInt(sessionStorage.getItem('grupo'));

    this.mensaje = new Mensaje(this.tema, '', 0, this.grupo,this.seccion, this.ultimoid);

    if(JSON.parse(sessionStorage.getItem('usuario')) !== null){
      this.usuarioexiste = true;
    }

    this._fc.getMensajes(this.tema, this.seccion, this.grupo).subscribe(data => {
      this.mensajes = [];
      data.forEach(e => {
          this.mensajes.push(new Mensaje( e['tema'], e['mensaje'], e['usuario'], e['grupo'], e['seccion'], e['id']));
          if (this.ultimoid < e['id']){
            this.ultimoid = e['id'];
          }
      });
      }
    );
  }

  
  enviar( form: NgForm ){
    
    if (!form.invalid && this.usuarioexiste){
      this.mensaje.setId(this.ultimoid+1);
      this._fc.saveMensaje(this.mensaje);

      this.mensaje = new Mensaje(this.tema, '', JSON.parse(sessionStorage.getItem('usuario'))['id'], this.grupo,this.seccion, this.ultimoid);
      this.valido = true;
    } else {
      this.valido = false;
    }
  }

  getusuario(id: number){

    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].getId() === id){
        return this.usuarios[i];
      }

    }

  }

}
