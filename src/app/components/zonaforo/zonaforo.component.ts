import { Component, OnInit, Input } from '@angular/core';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { Seccion } from '../../models/seccion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zonaforo',
  templateUrl: './zonaforo.component.html'
})
export class ZonaforoComponent implements OnInit {
  @Input() grupoid: number;
  private secciones: Array<Seccion>;

  constructor( public _fc: FirebaseForoService, private router: Router ) {}

  ngOnInit() {
    this._fc.getSecciones(this.grupoid).subscribe(data => {
      this.secciones = [];

      data.forEach(e => {
        this.secciones.push(new Seccion(e['id_seccion'], e['id_grupo'], e['nombre']));
      });
    });
  }
}
