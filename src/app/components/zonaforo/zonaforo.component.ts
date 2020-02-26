import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { Seccion } from '../../models/seccion';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Tema } from '../../models/tema';
import { Mensaje } from '../../models/mensaje';
import { Grupo } from '../../models/grupo';

@Component({
  selector: 'app-zonaforo',
  templateUrl: './zonaforo.component.html'
})
export class ZonaforoComponent implements OnInit {

  private formValido = false;
  private admin = false;
  private editar = false;
  @Input() grupoid: number;
  private secciones: Array<Seccion>;
  private seccion: Seccion;
  @ViewChild("mymodal", {static: true}) myModalo: TemplateRef<any>;
  @ViewChild("mymodalbor", {static: true}) mymodalbor: TemplateRef<any>;

  private ultimoidseccion = 0;
  private seccionmod: Seccion;

  constructor( public _fc: FirebaseForoService, private router: Router, private modalService: NgbModal ) {
    
    if (JSON.parse(localStorage.getItem('theItem')) != null){
      this._fc.getUsuarioId(parseInt(localStorage.getItem('theItem'))).subscribe(data => {
        data.forEach(e => {
          if (e['admin']){
            this.admin = true;
          }else {
            this.admin = false;
          }
        });
      });
    }
  }

  ngOnInit() {
    this.seccion = new Seccion(this.grupoid, 0, '');
    const grupocar = new Grupo('', this.grupoid);

    this._fc.getSecciones(grupocar).subscribe(data => {
      this.secciones = [];
      data.forEach(e => {
        this.secciones.push(new Seccion(e['id_grupo'], e['id_seccion'], e['nombre']));
        if (this.ultimoidseccion < e['id_seccion']){
          this.ultimoidseccion = e['id_seccion'];
        }
      });
    });
  }

  mostrarModalInfo() {
    this.editar = false;
    this.modalService.open(this.myModalo);
  }

  enviarSeccion(form: NgForm){

    if (!form.invalid){
      this.seccion.setId_seccion(this.ultimoidseccion+1);
      this.modalService.dismissAll();
      this._fc.saveSeccion(this.seccion);
      this.formValido = true;
    } else {
      this.formValido = false;
    }

  }

  editarbut(idseccion: number, seccionnombre: string) {
    this.seccionmod = new Seccion(this.grupoid, idseccion, seccionnombre);
    this.editar = true;
    this.modalService.open(this.myModalo);
  }

  editarf(form: NgForm) {
    this._fc.upSeccion(this.seccionmod);
    this.modalService.dismissAll();
  }

  eliminarbut(idseccion: number){
    this.seccionmod = new Seccion(this.grupoid, idseccion, '');
    this.modalService.open(this.mymodalbor);
  }

  borrar(){

    this._fc.getTemas(new Seccion(this.seccionmod.getGrupo(), this.seccionmod.getSeccion(), '')).subscribe(data => {
      data.forEach(e => {
        const temac = new Tema(e['id_tema'], e['id_creador'], e['nombretema'], e['id_seccion'], e['id_grupo'], e['fecha']);

        this._fc.getMensajes(temac).subscribe(dato => {

          // recorro los mensajes y los guardo
          dato.forEach(f => {

              // los guardo en memoria
              const mensajebor = new Mensaje( f['tema'], f['mensaje'], f['usuario'], f['grupo'], f['seccion'], f['id']);
              this._fc.delMensaje(mensajebor);
          });
          }
        );

        this._fc.deltema(temac);

      });
    });

    this._fc.delSeccion(this.seccionmod);
    this.modalService.dismissAll();
  }

  noborrar(){
    this.modalService.dismissAll();
  }
}
