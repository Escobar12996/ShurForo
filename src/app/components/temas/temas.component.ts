import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tema } from '../../models/tema';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Seccion } from '../../models/seccion';
import { NgForm } from '@angular/forms';
import { Mensaje } from '../../models/mensaje';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html'
})

export class TemasComponent implements OnInit {

  private editar = false;
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
  public idu: number;
  public admin = false;
  public temaed: Tema;

  @ViewChild("mymodalbor", {static: true}) mymodalbor: TemplateRef<any>;
  @ViewChild("myModalInfo", {static: true}) myModalInfo: TemplateRef<any>;


  constructor( public fc: FirebaseForoService, private router: Router, private ruta: ActivatedRoute, private modalService: NgbModal ) {

    // cambia la bandera para mostrar el wisiwi ese o el login
    if(JSON.parse(sessionStorage.getItem('usuario')) !== null) {
      this.idu = JSON.parse(sessionStorage.getItem('usuario'))['id'];
      this.admin = JSON.parse(sessionStorage.getItem('usuario'))['admin'];
    }
  }

  ngOnInit() {
    this.grupo = parseInt(this.ruta.snapshot.params.id_grupo);
    this.seccion = parseInt(this.ruta.snapshot.params.id_seccion);

    const seccioncar = new Seccion(parseInt(this.ruta.snapshot.params.id_grupo), parseInt(this.ruta.snapshot.params.id_seccion), '');

    this.fc.getSeccion(seccioncar).subscribe(data => {
      data.forEach(e => {
          this.seccionC = new Seccion(e['id_grupo'], e['id_seccion'], e['nombre']);

          this.fc.getTemas(this.seccionC).subscribe(data => {
            this.temas = [];
            data.forEach(e => {
                this.temas.push(new Tema( e['id_tema'], e['id_creador'], e['nombretema'], e['id_seccion'], e['id_grupo'], e['fecha']));
                if (this.ultimoidtema <= e['id_tema']){
                  this.ultimoidtema = e['id_tema'];
                }
            });
          });
      });

      if (this.temas === undefined && this.seccionC === undefined){
        this.router.navigate(['/notfound']);
      }
    });

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
      this.modalService.dismissAll();
    } else {
      this.formValido = false;
    }

    this.tema = new Tema(this.ultimoidtema,
      this.idu,
      '',
      this.seccion,
      this.grupo,
      new Date().getTime());
  }

  mostrarModalInfo() {
    this.editar = false;
    this.modalService.open(this.myModalInfo);
  }

  eliminarbut(id: number, usuario: number){
    this.tema = new Tema(id,
      usuario,
      '',
      this.seccion,
      this.grupo,
      new Date().getTime());
    this.modalService.open(this.mymodalbor);
  }

  eliminar(){

    this.fc.getMensajes(new Tema(this.tema.getidtema(), 0, '', this.seccion, this.grupo, 0)).subscribe(dato => {

      // recorro los mensajes y los guardo
      dato.forEach(f => {

          // los guardo en memoria
          const mensajebor = new Mensaje( f['tema'], f['mensaje'], f['usuario'], f['grupo'], f['seccion'], f['id']);
          this.fc.delMensaje(mensajebor);
      });
      }
    );

    this.fc.deltema(this.tema);

    this.tema = new Tema(this.ultimoidtema,
      this.idu,
      '',
      this.seccion,
      this.grupo,
      new Date().getTime());
      this.modalService.dismissAll();
  }

  noborrar(){
    this.modalService.dismissAll();

    this.tema = new Tema(this.ultimoidtema,
      this.idu,
      '',
      this.seccion,
      this.grupo,
      new Date().getTime());
  }

  editarbut(id: number, creador: number, tema: string){
    this.temaed = new Tema(id, creador, tema, this.seccion, this.grupo, new Date().getTime());
    this.editar = true;
    this.modalService.open(this.myModalInfo);
  }

  actualizar( form: NgForm ){

    if (!form.invalid){
      this.formValido = true;
      this.fc.updateTema(this.temaed);
      this.modalService.dismissAll();
    } else {
      this.formValido = false;
    }
  }
}
