import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { Seccion } from '../../models/seccion';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-zonaforo',
  templateUrl: './zonaforo.component.html'
})
export class ZonaforoComponent implements OnInit {

  private admin = false;
  @Input() grupoid: number;
  private secciones: Array<Seccion>;
  @ViewChild("mymodal", {static: true}) myModalo: TemplateRef<any>;

  constructor( public _fc: FirebaseForoService, private router: Router, private modalService: NgbModal ) {
    if (JSON.parse(sessionStorage.getItem('usuario'))['admin'] === true){
      this.admin = true;
    }
  }

  ngOnInit() {
    this._fc.getSecciones(this.grupoid).subscribe(data => {
      this.secciones = [];

      data.forEach(e => {
        this.secciones.push(new Seccion(e['id_seccion'], e['id_grupo'], e['nombre']));
      });
    });
  }

  mostrarModalInfo() {
    this.modalService.open(this.myModalo);
  }
  
}
