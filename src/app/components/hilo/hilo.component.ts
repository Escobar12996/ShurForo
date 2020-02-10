import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { Mensaje } from '../../models/mensaje';
import { NgForm } from '@angular/forms';
import { storage } from 'firebase';

@Component({
  selector: 'app-hilo',
  templateUrl: './hilo.component.html'
})
export class HiloComponent implements OnInit {

  private tema: string;
  private seccion: string;
  private grupo: string;
  private mensaje: Mensaje;
  private valido: boolean = false;
  private usuarioexiste: boolean = false;
  private ultimoid: number = 0;

  public mensajes: Array<Mensaje>;

  constructor(private rutaActiva: ActivatedRoute, public _fc: FirebaseForoService, private router: Router) {
    this.mensaje = new Mensaje();
    this.tema = this.rutaActiva.snapshot.params.tema;
    this.seccion = this.rutaActiva.snapshot.params.seccion;
    this.grupo = this.rutaActiva.snapshot.params.grupo;
   }

  ngOnInit() {

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
      this.mensaje.setTema(this.tema);
      this.mensaje.setGrupo(this.grupo);
      this.mensaje.setSeccion(this.seccion);
      this.mensaje.setUsuario(JSON.parse(sessionStorage.getItem('usuario'))['usuario']);
      this.mensaje.setId(this.ultimoid+1);
      this._fc.saveMensaje(this.mensaje);

      this.mensaje = new Mensaje();
      this.valido = true;
    } else {
      this.valido = false;
    }
  }

}
