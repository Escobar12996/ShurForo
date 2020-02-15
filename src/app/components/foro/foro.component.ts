import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FirebaseForoService } from '../../service/firebaseforo.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Grupo } from '../../models/grupo';
import { Seccion } from '../../models/seccion';
import { Tema } from '../../models/tema';
import { Mensaje } from '../../models/mensaje';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html'
})
export class ForoComponent implements OnInit {

  private editar = false;
  private admin = false;
  @ViewChild("mymodalforo", {static: true}) myModalo: TemplateRef<any>;
  @ViewChild("mymodalbor", {static: true}) mymodalbor: TemplateRef<any>;
  public grupos: Array<Grupo>;
  public grupo = new Grupo("", 0);
  private ultimogrupoid = 0;
  private formValido = true;
  private grupobor: Grupo;

  constructor( public _fc: FirebaseForoService, private modalService: NgbModal ) {
    
    this._fc.getGrupos().subscribe(data => {
      this.grupos = [];
      data.forEach(e => {
        this.grupos.push(new Grupo(e['nombre'], e['id_grupo']));
        if (this.ultimogrupoid < e['id_grupo']){
          this.ultimogrupoid = e['id_grupo'];
        }
      });
    }
    );
  }


  ngOnInit() {
    if (JSON.parse(sessionStorage.getItem('usuario')) != null && JSON.parse(sessionStorage.getItem('usuario'))['admin'] === true){
      this.admin = true;
    }
  }

  mostrarModalInfo() {
    this.grupo.setNombre('');
    this.editar = false;
    this.modalService.open(this.myModalo);
  }

  enviarGrupo(form: NgForm){
    if (!form.invalid){
      if (this.editar === false){
        this.grupo.setIdgrupo(this.ultimogrupoid+1);
        this._fc.saveGrupo(this.grupo);
      } else {
        this._fc.upGrupo(this.grupo);
      }
      
      this.modalService.dismissAll();
      this.formValido = true;
    } else {
      this.formValido = false;
    }

  }
  eliminarbut(id_grupo: number){
    this.grupobor = new Grupo('', id_grupo);
    this.modalService.open(this.mymodalbor);
  }
  
  editarFu(id_grupo: number){
    this.grupo.setNombre('');
    this.editar = true;
    this.modalService.open(this.myModalo);
    this.grupo.setIdgrupo(id_grupo);
  }

  borrar() {

    this._fc.getSecciones(this.grupobor).subscribe(data => {

      data.forEach(e => {

        this._fc.getTemas(new Seccion(e['id_grupo'], e['id_seccion'], e['nombre'])).subscribe(data => {
          data.forEach(i => {
            const temac = new Tema(i['id_tema'], i['id_creador'], i['nombretema'], i['id_seccion'], i['id_grupo'], i['fecha']);
    
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

        this._fc.delSeccion(new Seccion(e['id_grupo'], e['id_seccion'], e['nombre']));
      });
    });

    this._fc.delGrupo(this.grupobor);
    this.modalService.dismissAll();
  }

  noborrar() {
    this.modalService.dismissAll();
  }
}

