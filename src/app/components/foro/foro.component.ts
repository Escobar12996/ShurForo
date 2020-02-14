import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FirebaseForoService } from '../../service/firebaseforo.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Grupo } from '../../models/grupo';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html'
})
export class ForoComponent implements OnInit {

  private editar = false;
  private admin = false;
  @ViewChild("mymodalforo", {static: true}) myModalo: TemplateRef<any>;
  public grupos: Array<Grupo>;
  public grupo = new Grupo("", 0);
  private ultimogrupoid = 0;
  private formValido = true;

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
  eliminar(id_grupo: number){
  
  }
  
  editarFu(id_grupo: number){
    this.grupo.setNombre('');
    this.editar = true;
    this.modalService.open(this.myModalo);
    this.grupo.setIdgrupo(id_grupo);
  }
}

