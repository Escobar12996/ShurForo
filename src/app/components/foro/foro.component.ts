import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { Grupo } from '../../models/grupo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html'
})
export class ForoComponent implements OnInit {

  private admin = false;
  @ViewChild("mymodalforo", {static: true}) myModalo: TemplateRef<any>;
  public grupos: Array<Grupo>;

  constructor( public _fc: FirebaseForoService, private modalService: NgbModal ) {
    this.grupos = [];
    this._fc.getGrupos().subscribe(data => {
      data.forEach(e => {
        this.grupos.push(new Grupo(e['nombre'], e['id_grupo']));
      });
    }
    );
  }


  ngOnInit() {
    if (JSON.parse(sessionStorage.getItem('usuario'))['admin'] === true){
      this.admin = true;
    }
  }

  mostrarModalInfo() {
    this.modalService.open(this.myModalo);
  }
}
