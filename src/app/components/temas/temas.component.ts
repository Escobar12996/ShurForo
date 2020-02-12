import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tema } from '../../models/tema';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Seccion } from '../../models/seccion';
import { NgForm } from '@angular/forms';
import { Mensaje } from '../../models/mensaje';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html'
})
export class TemasComponent implements OnInit {

  public seccion: number;
  public grupo: number;
  public temas: Array<Tema>;
  public editor = ClassicEditor;
  public seccionC: Seccion;
  public formValido = true;
  public tema: Tema;
  public ultimoidtema = 0;
  public mensaje: Mensaje;
  public temaC = false;

  constructor( public fc: FirebaseForoService, private router: Router, private ruta: ActivatedRoute ) {}

  ngOnInit() {
    this.grupo = parseInt(this.ruta.snapshot.params.id_grupo);
    this.seccion = parseInt(this.ruta.snapshot.params.id_seccion);

    this.fc.getSeccion(this.seccion, this.grupo).subscribe(data => {
      data.forEach(e => {
          this.seccionC = new Seccion(e['id_seccion'],e['id_grupo'], e['nombre']);
      });
      }
    );

    this.fc.getTemas(this.grupo, this.seccion).subscribe(data => {
      this.temas = [];
      console.log(data);
      data.forEach(e => {
          this.temas.push(new Tema( e['id_tema'], e['id_creador'], e['nombretema'], e['id_seccion'], e['id_grupo'], e['fecha']));
          if (this.ultimoidtema <= e['id_tema']){
            this.ultimoidtema = e['id_tema'];
          }
      });
      }
    );

    if (JSON.parse(sessionStorage.getItem('usuario')) != undefined ){
      this.tema = new Tema(this.ultimoidtema + 1,
        JSON.parse(sessionStorage.getItem('usuario'))['id'],
        '',
        this.seccion,
        this.grupo,
        new Date().getTime());

      this.mensaje = new Mensaje(this.ultimoidtema, '', JSON.parse(sessionStorage.getItem('usuario'))['id'], this.grupo, this.seccion, 0);
      this.temaC = true;
    }
  }

  enviarTema( form: NgForm ){

    console.log(this.ultimoidtema);
    if (!form.invalid){
      this.tema.setidtema(this.ultimoidtema+1);
      this.mensaje.setTema(this.ultimoidtema+1);
      this.formValido = true;
      this.fc.savethisTema(this.tema);
      this.fc.saveMensaje(this.mensaje);
      this.router.navigate(['/home/'+this.tema.getGrupo()+'/'+this.tema.getSeccion()+'/'+this.tema.getNombreTema()]);
    } else {
      this.formValido = false;
    }
  }
}
