import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { Mensaje } from '../../models/mensaje';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { Tema } from '../../models/tema';

@Component({
  selector: 'app-hilo',
  templateUrl: './hilo.component.html'
})
export class HiloComponent implements OnInit {

  private temaNombre: string;
  private seccion: number;
  private grupo: number;
  private usuarioexiste = true;
  private ultimoid = 0;
  private valido = true;

  private tema: Tema = new Tema(0,0,'carganado',0,0,0);
  public mensajes: Array<Mensaje>;
  public usuarios: Array<User>;
  private mensaje: Mensaje = new Mensaje();

  constructor(public _fc: FirebaseForoService, private router: Router, private ruta: ActivatedRoute) {
    this._fc.getUsuarios().subscribe(data=>{
      this.usuarios = [];
      data.forEach(e => {
        this.usuarios.push(new User(e['id'],e['usuario'] ,e['email'],e['contrasena'],e['nombreappe'],e['sexo'],e['pais'],e['aficiones']));
      });
    });

    this.grupo = parseInt(this.ruta.snapshot.params.id_grupo);
    this.seccion = parseInt(this.ruta.snapshot.params.id_seccion);
    this.temaNombre = this.ruta.snapshot.params.nombredelhilo;

    
    if(JSON.parse(sessionStorage.getItem('usuario')) !== null){
      this.usuarioexiste = true;
    }
    
    this._fc.getThisTema(this.grupo, this.seccion, this.temaNombre).subscribe(data => {

      data.forEach(e => {

        if (e['nombretema'] == this.temaNombre && e['id_grupo'] == this.grupo && e['id_seccion'] == this.seccion){
          this.tema = new Tema( e['id_tema'], e['id_creador'], e['nombretema'], e['id_seccion'], e['id_grupo'], e['fecha']);
          this.mensaje = new Mensaje(this.tema.getidtema(), '', 0, this.grupo,this.seccion, this.ultimoid);

          this._fc.getMensajes(this.tema.getidtema(), this.seccion, this.grupo).subscribe(data => {
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
      });
      }
    );
  }

  ngOnInit() {
    


    
  }

  
  enviar( form: NgForm ){
    
    if (!form.invalid && this.usuarioexiste){
      this.mensaje.setId(this.ultimoid+1);
      this._fc.saveMensaje(this.mensaje);

      this.mensaje = new Mensaje(this.tema.getidtema(), '',
                                  JSON.parse(sessionStorage.getItem('usuario'))['id'],
                                  this.grupo,this.seccion,
                                  this.ultimoid);
      this.valido = true;
    } else {
      this.valido = false;
    }
  }

  getusuario(id: number){

    // this._fc.getUsuarioId(id).subscribe(data=>{
    //   this.usuarios = [];
    //   data.forEach(e => {
    //     return new User(e['id'],e['usuario'] ,e['email'],e['contrasena'],e['nombreappe'],e['sexo'],e['pais'],e['aficiones']);
    //   });
    // });

    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].getId() === id){
        return this.usuarios[i];
      }

    }

  }

}
